import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrolment } from './enrolment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field(() => [Enrolment])
  enrolments: Enrolment[];
}
