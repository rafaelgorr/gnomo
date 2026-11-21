-include back/.env

DATABASE_URL ?= postgres://test:test@localhost:5434/test
TEST_DATABASE_URL ?= postgres://gnomo:gnomo@localhost:5439/test_gnome_db

# CORE 

.PHONY: run-migrations
run-migrations:
	cd core && \
	pnpm prisma migrate dev

.PHONY: run-test-migrations
run-test-migrations:
	cd core && \
	DATABASE_URL=${TEST_DATABASE_URL} pnpm prisma migrate dev

.PHONY: create-migration
create-migration:
	cd core && \
	pnpm prisma migrate dev --create-only

.PHONY: build-core
build-core:
	cd core && \
	pnpm prisma generate

# SHARED

.PHONY: build-uikit
build-uikit:
	cd shared/uikit && \
	pnpm build

.PHONY: build-shared
build-shared: build-uikit

.PHONY: build-contracts
build-contracts:
	cd shared/contracts && \
	pnpm create-main && \
	pnpm exec tsp compile .

.PHONY: generate-front-contracts
generate-front-contracts: build-contracts
	cd shared/contracts && \
	./generate-front-types.sh && \
	cd ../../ && \
	pnpm prettier --write front/src/generated/contracts/*.ts

.PHONY: generate-back-contracts
generate-back-contracts: build-contracts
	cd shared/contracts && \
	./generate-back-types.sh

.PHONY: generate-contracts
generate-contracts: generate-back-contracts generate-front-contracts

# BACK

.PHONY: generate-models
generate-models:
	cd back && \
	sqlx-gen generate entities \
	--type-overrides "numeric=bigdecimal::BigDecimal" \
	--database-url "${DATABASE_URL}" \
	-o ./src/domain/models \
	-s kitchen

.PHONY: run-back
run-back: build-core generate-back-contracts
	cd back && \
	cargo run

.PHONY: build-back
build-back: build-core
	cd back && \
	cargo build $(ARGS)

.PHONY: test-back
test-back: run-test-migrations 
	cd back && \
	DATABASE_URL=${TEST_DATABASE_URL} cargo test

.PHONY: docker-back
docker-back: 
	docker compose up db -d && \
	docker compose up -d --no-deps --build back

# FRONT

.PHONY: run-front
run-front:
	cd front && \
	pnpm vite --host

.PHONY: build-front
build-front: build-uikit generate-front-contracts
	cd front && \
	pnpm build

.PHONY: lint-front
lint-front: ## Check for lint errors
	cd front && pnpm eslint .

.PHONY: docker-front
docker-front: 
	docker compose up -d --no-deps --build front

