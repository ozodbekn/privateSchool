import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { PrismaService } from "./prisma/prisma.service";
import { ParentsModule } from "./parents/parents.module";
import { TeachersModule } from "./teachers/teachers.module";
import { AdminsModule } from "./admins/admins.module";
import { DirectorsModule } from "./directors/directors.module";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { winstonConfig } from "./common/logging/winston.logging";
import { WinstonModule } from "nest-winston";
import { StudentsModule } from './students/students.module';
import { SchoolsModule } from './schools/schools.module';
import { TeacherAttenddanceModule } from './teacher-attenddance/teacher-attenddance.module';
import { RoomsModule } from './rooms/rooms.module';
import { LessonsModule } from './lessons/lessons.module';
import { ClassesModule } from './classes/classes.module';
import { SubjectsModule } from './subjects/subjects.module';
import { StudentAttenddanceModule } from './student-attenddance/student-attenddance.module';
import { HomeworksModule } from './homeworks/homeworks.module';
import { HomeworkSumbmissionModule } from './homework-sumbmission/homework-sumbmission.module';
import { ContractsModule } from './contracts/contracts.module';
import { PaymentsModule } from './payments/payments.module';
import { SmartQueryModule } from './smart-query/smart-query.module';

@Module({
  imports: [
    WinstonModule.forRoot(winstonConfig),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    AuthModule,
    PrismaModule,
    TeachersModule,
    AdminsModule,
    DirectorsModule,
    MailModule,
    StudentsModule,
    SchoolsModule,
    TeacherAttenddanceModule,
    RoomsModule,
    LessonsModule,
    SubjectsModule,
    StudentAttenddanceModule,
    HomeworksModule,
    HomeworkSumbmissionModule,
    ContractsModule,
    PaymentsModule,
    ClassesModule,
    SmartQueryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
