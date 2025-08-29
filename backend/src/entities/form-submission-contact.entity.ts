import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "form_submission_contact" })
export class FormSubmissionContact {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "answer_first_name" })
  answerFirstName: string;

  @Column({ name: "answer_last_name" })
  answerLastName: string;

  @Column({ name: "answer_email" })
  answerEmail: string;

  @Column({ name: "answer_phone", nullable: true })
  answerPhone?: string;

  @Column({ name: "answer_message" })
  answerMessage: string;

  @Column({ name: "country", nullable: true })
  country?: string;

  @Column({ name: "city", nullable: true })
  city?: string;

  @Column({ name: "user_agent" })
  userAgent: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ name: "is_test", type: "boolean", default: false })
  isTest: boolean;
}
