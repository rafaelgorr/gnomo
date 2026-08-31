-include back/.env

DATABASE_URL ?= postgres://test:test@localhost:5434/test

.PHONY: run-back
run-back:
	cd back && \
	cargo run

.PHONY: test-back
test-back:
	cd back && \
	cargo test

.PHONY: generate-models
generate-models:
	cd back && \
	sqlx-gen generate entities \
	--type-overrides "numeric=bigdecimal::BigDecimal" \
	--database-url "${DATABASE_URL}" \
	-o ./src/domain/models \
	-s kitchen

.PHONY: run-migrations
run-migrations:
	cd core && \
	pnpm prisma migrate dev

.PHONY: create-migration
create-migration:
	cd core && \
	pnpm prisma migrate dev --create-only


