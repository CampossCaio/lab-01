import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Enrolment } from './enrolment';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "authUserId")')
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external')
  authUserId: string;

  @Field(() => [Enrolment])
  enrolments: Enrolment[];
}
