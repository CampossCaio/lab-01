import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Parent, ResolveField } from '@nestjs/graphql';
import { EnrolmentsService } from '../../../services/enrolments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrolmentService: EnrolmentsService,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.lisAllStudents();
  }

  @ResolveField()
  enrolments(@Parent() student: Student) {
    return this.enrolmentService.listEnrolmentsByStudent(student.id);
  }
}
