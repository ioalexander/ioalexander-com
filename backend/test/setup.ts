import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export default async function globalSetup() {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "db_data/data.db",
    synchronize: false,
    entities: [
      process.env.NODE_ENV === "test" //
        ? "src/entities/*.entity.ts"
        : "dist/src/entities/*.entity.js",
    ],
    migrations: ["src/migrations/*.js"],
  });

  await dataSource.initialize();

  await dataSource.query(
    `DELETE FROM "form_submission_contact" WHERE "is_test" = true;`,
  );

  await dataSource.destroy();

  console.log("");
  console.log("");
  console.log("--- Setup complete. Running tests... ---");
  console.log("");
  console.log("");
}
