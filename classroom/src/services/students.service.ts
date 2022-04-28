import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface createStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  lisAllStudents() {
    return this.prisma.student.findMany();
  }

  getStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  getStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }

  createStudent({ authUserId }: createStudentParams) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }
}
