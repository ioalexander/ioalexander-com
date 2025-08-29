import { DataSource } from "typeorm";
import { FormSubmissionContact } from "../entities/form-submission-contact.entity";
import { envs } from "../shared/envs";

export class FormSubmissionContactRepository {
  constructor(private dataSource: DataSource) {}

  private get repo() {
    return this.dataSource.getRepository(FormSubmissionContact);
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
  }): Promise<FormSubmissionContact> {
    const submission = this.repo.create({ ...data, isTest: envs.IS_TESTING });
    return this.repo.save(submission);
  }

  async findAll(): Promise<FormSubmissionContact[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<FormSubmissionContact | null> {
    return this.repo.findOneBy({ id });
  }
}
