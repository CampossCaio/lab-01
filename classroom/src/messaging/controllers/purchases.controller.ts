import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CoursesService } from '../../services/courses.service';
import { EnrolmentsService } from '../../services/enrolments.service';
import { StudentsService } from '../../services/students.service';

export interface Customer {
  authUser: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface PurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private courseService: CoursesService,
    private enrolmentsService: EnrolmentsService,
  ) {}

  @EventPattern('purchase.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    let student = await this.studentsService.getStudentByAuthUserId(
      payload.customer.authUser,
    );

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUser,
      });
    }

    console.log('slug', payload.product.slug);

    let course = await this.courseService.getCourseBySlug(payload.product.slug);

    if (!course) {
      course = await this.courseService.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrolmentsService.createEnrolment({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
