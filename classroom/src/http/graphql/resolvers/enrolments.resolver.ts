import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { EnrolmentsService } from '../../../services/enrolments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Enrolment } from '../models/enrolment';

@Resolver(() => Enrolment)
export class EnrolmentsResolver {
  constructor(
    private enrolmentsService: EnrolmentsService,
    private studentsService: StudentsService,
    private courseService: CoursesService,
  ) {}

  @Query(() => [Enrolment])
  @UseGuards(AuthorizationGuard)
  enrolments() {
    return this.enrolmentsService.lisAllEnrolments();
  }

  @ResolveField()
  student(@Parent() enrollment: Enrolment) {
    return this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField()
  course(@Parent() enrollment: Enrolment) {
    return this.courseService.getCouseById(enrollment.courseId);
  }
}
