-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bis_loc" TEXT NOT NULL,
    "date_loc" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "pesnan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "products" TEXT NOT NULL,
    "table_id" TEXT NOT NULL,
    "waiter_id" TEXT NOT NULL,
    "time" TEXT NOT NULL
);
