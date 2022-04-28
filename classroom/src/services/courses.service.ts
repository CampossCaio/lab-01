import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import slugify from 'slugify';

interface CreateCourseParams {
  slug?: string;
  title: string;
}

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  lisAllCourses() {
    return this.prisma.course.findMany();
  }

  getCouseById(id: string) {
    return this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  getCourseBySlug(slug: string) {
    return this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });

    if (courseAlreadyExists) {
      throw new Error('Course with the same slug already exists');
    }

    return this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
