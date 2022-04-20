import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface getByCourseAndStudentParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrolmentsService {
  constructor(private prisma: PrismaService) {}

  getByCourseAndStudentId({
    courseId,
    studentId,
  }: getByCourseAndStudentParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null,
      },
    });
  }

  lisAllEnrolments() {
    return this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listEnrolmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
