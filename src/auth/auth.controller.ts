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
// import { CreateUserDto } from "../user/dto/create-user.dto";
// import { CreateAdminDto } from "../admin/dto/create-admin.dto";
// import { LoginDto } from "../user/dto/login.dto";
// import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

// @ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login/admin")
  //   @ApiOperation({ summary: "User/Manager login" })
  async loginAdmin(
    @Body() dto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginAdmin(dto, res);
  }
  @Post("login/parent")
  //   @ApiOperation({ summary: "User/Manager login" })
  async loginParent(
    @Body() dto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginParent(dto, res);
  }
  @Post("login/teacher")
  //   @ApiOperation({ summary: "User/Manager login" })
  async loginTeacher(
    @Body() dto: LoginTeacherDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginTeacher(dto, res);
  }
  @Post("login/student")
  //   @ApiOperation({ summary: "User/Manager login" })
  async loginStudent(
    @Body() dto: LoginStudentDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginStudent(dto, res);
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

  //   @Post("register/user")
  //   @ApiOperation({ summary: "Register user (USER/MANAGER)" })
  //   @ApiResponse({ status: 201, description: "User registered" })
  //   async registerUser(@Body() dto: CreateUserDto) {
  //     return this.authService.registerUser(dto);
  //   }

  //   @ApiOperation({ summary: "Register admin" })
  //   @ApiResponse({ status: 201, description: "Admin registered" })
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

  //   @Post("login/teacher")
  //   //   @ApiOperation({ summary: "User/Manager login" })
  //   async loginUser(
  //     @Body() dto: LoginTeacherDto,
  //     @Res({ passthrough: true }) res: Response
  //   ) {
  //     return this.authService.loginTeacher(dto.email, dto.password, res);
  //   }

  //   @Post("logout")
  //   @ApiOperation({ summary: "Logout user/admin" })
  //   async logout(@Res({ passthrough: true }) res: Response) {
  //     return this.authService.logout(res);
  //   }

  //   @Post("refresh-token")
  //   @ApiOperation({ summary: "Refresh token" })
  //   async refresh(@Res({ passthrough: true }) res: Response) {
  //     const token = res.req.cookies?.refresh_token;
  //     return this.authService.refreshToken(token, res);
  //   }
}
