-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_snacks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "hour" TEXT NOT NULL,
    "is_diet" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "snacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_snacks" ("created_at", "date", "description", "hour", "id", "is_diet", "title", "user_id") SELECT "created_at", "date", "description", "hour", "id", "is_diet", "title", "user_id" FROM "snacks";
DROP TABLE "snacks";
ALTER TABLE "new_snacks" RENAME TO "snacks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
