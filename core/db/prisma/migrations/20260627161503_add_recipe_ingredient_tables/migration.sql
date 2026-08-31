-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "kitchen";

-- CreateTable
CREATE TABLE "kitchen"."db_ingredient" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "quantity" DECIMAL(10,2) NOT NULL,
    "recipe_id" UUID NOT NULL,

    CONSTRAINT "db_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitchen"."db_recipe" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(25) NOT NULL,
    "description" VARCHAR(50),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "db_recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kitchen"."db_ingredient" ADD CONSTRAINT "db_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "kitchen"."db_recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
