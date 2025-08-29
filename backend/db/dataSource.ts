import { DataSource, type DataSourceOptions } from "typeorm";

import "dotenv/config";
import { FormSubmissionContactEntity } from "../src/entities/form-submission-contact.entity";

export const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: "db_data/data.db",
  synchronize: false,
  entities: [FormSubmissionContactEntity],
  migrations: ["src/migrations/*.js"],
};

export default new DataSource(dataSourceOptions);
