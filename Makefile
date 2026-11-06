-include back/.env

DATABASE_URL ?= postgres://test:test@localhost:5434/test


.PHONY: build-uikit
build-uikit:
	cd shared/uikit && \
	pnpm build

.PHONY: build-contracts
build-contracts:
	cd shared/contracts && \
	pnpm create-main && \
	tsp compile .

.PHONY: generate-contracts
generate-contracts: build-contracts
	cd shared/contracts && \
	./generate-contract-types.sh && \
	cd ../../ && \
	pnpm prettier --write front/src/api/generated/contracts/*.ts

.PHONY: build-shared
build-shared: build-uikit

.PHONY: build-core
build-core:
	cd core && \
	pnpm prisma generate

.PHONY: run-back
run-back: build-core generate-contracts
	cd back && \
	cargo run

.PHONY: build-back
build-back: build-core
	cd back && \
	cargo build

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
