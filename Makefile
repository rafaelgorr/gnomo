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
	cd shared/core && \
	pnpm prisma migrate dev

.PHONY: create-migration
create-migration:
	cd shared/core && \
	pnpm prisma migrate dev --create-only

.PHONY: build-uikit
build-uikit:
	cd shared/uikit && \
	pnpm exec vite build && \
	pnpm exec tsc

.PHONY: run-front
run-front:
	cd front && \
	pnpm vite --host

.PHONY: build-front
build-front: build-uikit
	cd front && \
	pnpm exec vite build && \
	pnpm exec tsc

.PHONY: lint-front
lint-front: ## Check for lint errors
	cd front && pnpm eslint .
