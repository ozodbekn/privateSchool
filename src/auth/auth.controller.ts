import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  HttpStatus,
  Get,
  Param,
} from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";
import { CreateAdminDto, LoginAdminDto } from "../admins/dto";
import { LoginTeacherDto } from "../teachers/dto/login-teacher.dto";
import { cookieGetter } from "../common/decorators/cookie-getter.decorator";
import { LoginStudentDto } from "../students/dto";
import { CreateParentDto } from "../parents/dto";
import { LoginDirectorDto } from "../directors/dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@ApiBearerAuth("token")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post("login/admin")
  async loginAdmin(
    @Body() dto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(dto, res);
  }
  @Post("login/parent")
  async loginParent(
    @Body() dto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginParent(dto, res);
  }
  @Post("login/teacher")
  
  async loginTeacher(
    @Body() dto: LoginTeacherDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginTeacher(dto, res);
  }
  @Post("login/student")
  async loginStudent(
    @Body() dto: LoginStudentDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginStudent(dto, res);
  }

  @Post("login/director")
 
  async loginDirector(
    @Body() dto: LoginDirectorDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginDerictor(dto, res);
  }
  @HttpCode(200)
  @Post("/refresh/teacher")
  refreshTeacher(
    @cookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenTeacher(refreshToken, res);
  }
  @HttpCode(200)
  @Post("/refresh/student")
  refreshStudent(
    @cookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenStudent(refreshToken, res);
  }
  @HttpCode(200)
  @Post("/refresh/director")
  refreshDirector(
    @cookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenDirector(refreshToken, res);
  }

  @HttpCode(200)
  @Post("logout/teacher")
  logoutTeacher(
    @cookieGetter("refreshToken") refeshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutTeacher(refeshToken, res);
  }
  @HttpCode(200)
  @Post("logout/student")
  logoutStudent(
    @cookieGetter("refreshToken") refeshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutStudent(refeshToken, res);
  }
  @HttpCode(200)
  @Post("logout/director")
  logoutDirector(
    @cookieGetter("refreshToken") refeshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutDirector(refeshToken, res);
  }

 
  @Post("register/admin")
  async registerAdmin(@Body() dto: CreateAdminDto) {
    return this.authService.registerAdmin(dto);
  }
  @Post("register/parent")
  async registerParent(@Body() dto: CreateParentDto) {
    return this.authService.registerParent(dto);
  }

  @Get("activate/:activationLink")
  activateAdmin(@Param(`activationLink`) activationLink: string) {
    return this.authService.activateAdmin(activationLink);
  }
  @Get("commit/:activationLink")
  activateParent(@Param(`activationLink`) activationLink: string) {
    return this.authService.activateParent(activationLink);
  }

  @HttpCode(200)
  @Post("refresh/admin")
  refreshAdmin(
    @cookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(refreshToken, res);
  }
  @HttpCode(200)
  @Post("refresh/parent")
  refreshParent(
    @cookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenParent(refreshToken, res);
  }

  @HttpCode(200)
  @Post("logout/admin")
  logout(
    @cookieGetter("refreshToken") refeshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutAdmin(refeshToken, res);
  }

  @HttpCode(200)
  @Post("logout/parent")
  logoutParent(
    @cookieGetter("refreshToken") refeshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutParent(refeshToken, res);
  }
}
