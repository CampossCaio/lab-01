import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from '../database/database.module';
import path from 'node:path';
import { ApolloDriver } from '@nestjs/apollo';
import { CoursesResolver } from './graphql/resolvers/couses.resolver';
import { EnrolmentsResolver } from './graphql/resolvers/enrolments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { CoursesService } from '../services/courses.service';
import { EnrolmentsService } from '../services/enrolments.service';
import { StudentsService } from '../services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    //Resolvers
    CoursesResolver,
    EnrolmentsResolver,
    StudentsResolver,

    //Services
    CoursesService,
    EnrolmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
