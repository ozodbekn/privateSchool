import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";
import { loggers } from "winston";
import {
  WINSTON_MODULE_NEST_PROVIDER,
  WinstonLogger,
  WinstonModule,
} from "nest-winston";
import { winstonConfig } from "./common/logging/winston.logging";
import { AllExceptionsFilter } from "./common/errors/error.handling";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  const config = app.get(ConfigService);
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  const configBuilder = new DocumentBuilder()
  .setTitle("myRestourant Project")
  .setDescription("myRestourant REST API")
  .setVersion("1.0")
  .addTag("AccessToken, RefreshToken, Cookie, SendMail,Guards")
  .addBearerAuth(
    {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Enter JWT token",
      in: "header",
    },
    "token"
  )
  .build();
const document = SwaggerModule.createDocument(app, configBuilder);
SwaggerModule.setup("/api/docs", app, document);
  const PORT = config.get<number>("PORT");
  await app.listen(PORT ?? 3030, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
}
start();
