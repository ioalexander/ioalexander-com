import { DataSource, type DataSourceOptions } from "typeorm";

import "dotenv/config";

export const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: "db_data/data.db",
  synchronize: false,
  entities: [
    process.env.NODE_ENV === "test" //
      ? "src/entities/*.entity.ts"
      : "dist/src/entities/*.entity.js",
  ],
  migrations: ["src/migrations/*.js"],
};

export default new DataSource(dataSourceOptions);
