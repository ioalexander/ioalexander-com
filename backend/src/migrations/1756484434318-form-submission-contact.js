const { Table } = require("typeorm");

/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class FormSubmissionContact1756484434318 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "form_submission_contact",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "answer_first_name",
            type: "varchar",
          },
          {
            name: "answer_last_name",
            type: "varchar",
          },
          {
            name: "answer_email",
            type: "varchar",
          },
          {
            name: "answer_phone",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "answer_message",
            type: "text",
          },
          {
            name: "country",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "user_agent",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "datetime",
            default: "(datetime('now'))",
          },
          {
            name: "updated_at",
            type: "datetime",
            default: "(datetime('now'))",
          },
          {
            name: "is_test",
            type: "integer",
            default: 0,
          },
        ],
      }),
    );
  }

  async down(queryRunner) {
    await queryRunner.dropTable("form_submission_contact");
  }
};
