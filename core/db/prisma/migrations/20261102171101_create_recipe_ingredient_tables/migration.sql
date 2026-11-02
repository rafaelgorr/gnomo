-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "kitchen";

-- CreateTable
CREATE TABLE "kitchen"."db_ingredient" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(100) NOT NULL,
    "recipe_id" UUID NOT NULL,

    CONSTRAINT "db_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitchen"."db_recipe_step" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "index" INTEGER NOT NULL,
    "instruction" VARCHAR(500),
    "dbRecipeId" UUID NOT NULL,

    CONSTRAINT "db_recipe_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitchen"."db_recipe" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "prep_time" INTEGER NOT NULL,
    "cook_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),

    CONSTRAINT "db_recipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kitchen"."db_ingredient" ADD CONSTRAINT "db_ingredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "kitchen"."db_recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kitchen"."db_recipe_step" ADD CONSTRAINT "db_recipe_step_dbRecipeId_fkey" FOREIGN KEY ("dbRecipeId") REFERENCES "kitchen"."db_recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
