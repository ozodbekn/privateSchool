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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
