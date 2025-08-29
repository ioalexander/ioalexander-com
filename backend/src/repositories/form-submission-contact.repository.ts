import { DataSource } from "typeorm";
import { FormSubmissionContactEntity } from "../entities/form-submission-contact.entity";
import { envs } from "../shared/envs";

export class FormSubmissionContactRepository {
  constructor(private dataSource: DataSource) {}

  private get repo() {
    return this.dataSource.getRepository(FormSubmissionContactEntity);
  }

  async create(data: {
    answerFirstName: string;
    answerLastName: string;
    answerEmail: string;
    answerPhone?: string;
    answerMessage: string;
    country?: string;
    city?: string;
    userAgent: string;
  }): Promise<FormSubmissionContactEntity> {
    const submission = this.repo.create({ ...data, isTest: envs.IS_TESTING });
    return this.repo.save(submission);
  }

  async findAll(): Promise<FormSubmissionContactEntity[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<FormSubmissionContactEntity | null> {
    return this.repo.findOneBy({ id });
  }
}
