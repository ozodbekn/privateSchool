import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ConflictException,
  ServiceUnavailableException,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { CreateParentDto, LoginParentsDto } from "../parents/dto";
import { CreateTeacherDto } from "../teachers/dto/create-teacher.dto";
import { LoginTeacherDto } from "../teachers/dto/login-teacher.dto";
import { CreateAdminDto, LoginAdminDto } from "../admins/dto";
import { CreateDirectorDto, LoginDirectorDto } from "../directors/dto";
import { JwtService } from "@nestjs/jwt";
import { Admins } from "@prisma/client";
import { MailService } from "../mail/mail.service";
import { LoginStudentDto } from "../students/dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}

  async activateAdmin(activationLink: string) {
    const admin = await this.prisma.admins.findFirst({
      where: { activationLink: activationLink },
    });
    if (!admin) {
      throw new UnauthorizedException("Link topilmadi");
    }
    if (admin.is_active) {
      return { message: `User avval activate bolgan ` };
    }

    await this.prisma.admins.update({
      where: { id: admin.id },
      data: {
        is_active: true,
      },
    });
    return { message: `Siz accountingizni activate qildingiz` };
  }

  async activateParent(activationLink: string) {
    console.log(activationLink);
    const parent = await this.prisma.parents.findFirst({
      where: { activationLink },
    });
    console.log(parent);
    console.log(parent?.activationLink);
    if (!parent) {
      throw new UnauthorizedException("Links topilmadi");
    }
    if (parent.is_active) {
      return { message: `User avval activate bolgan ` };
    }

    await this.prisma.parents.update({
      where: { id: parent.id },
      data: {
        is_active: true,
      },
    });
    return { message: `Siz accountingizni activate qildingiz` };
  }

  async generateTokens(user: any) {
    const payload = {
      id: user.id,
      email: user.email,
      is_creator: user.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async generateTokensWithoutEmail(user: any) {
    const payload = {
      id: user.id,
      ID: user.ID,
      phone_number: user.phone_number,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async registerAdmin(createAdminDto: CreateAdminDto) {
    const { email } = createAdminDto;
    const candidate = await this.prisma.admins.findUnique({
      where: { email },
    });
    if (candidate) {
      throw new ConflictException("Bunday Admin mavjud");
    }

    const hashed = await bcrypt.hash(createAdminDto.password, 7);

    const newAdmin = await this.prisma.admins.create({
      data: {
        full_name: createAdminDto.full_name,
        email: createAdminDto.email,
        phone_number: createAdminDto.phone_number,
        hashedPassword: hashed,
      },
    });
    try {
      await this.mailService.sendMailAdmin(newAdmin);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return {
      message: "Akkauntni faollashtirish uchun emailga jo'natildi",
      userId: newAdmin.id,
    };
  }

  async registerParent(createParentDto: CreateParentDto) {
    const {
      full_name,
      email,
      phone_number,
      password,
      confirm_password,
      studentsId,
    } = createParentDto;

    if (password !== confirm_password) {
      throw new ConflictException("Password mos emas");
    }
    const candidate = await this.prisma.parents.findUnique({
      where: { email },
    });

    if (candidate) {
      throw new ConflictException("Bunday user mavjud");
    }

    const hashed = await bcrypt.hash(password, 7);

    const newParent = await this.prisma.parents.create({
      data: {
        full_name,
        email,
        phone_number,
        hashedPassword: hashed,
        studentsId,
      },
    });
    try {
      await this.mailService.sendMailParent(newParent);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return {
      message: "Akkauntni faollashtirish uchun emailga jo'natildi",
      userId: newParent.id,
    };
  }

  async loginParent(loginParentsDto: LoginParentsDto, res: Response) {
    const { email, password } = loginParentsDto;
    const parent = await this.prisma.parents.findUnique({
      where: { email },
    });

    if (!parent) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }
    if (parent.is_active == false) {
      throw new ForbiddenException(
        "Siz faol foydalanuvchi emassiz.Avval ro'yxatdan o'ting"
      );
    }

    const isMatched = await bcrypt.compare(password, parent.hashedPassword);

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri.");
    }

    const { accessToken, refreshToken } = await this.generateTokens(parent);

    await this.prisma.parents.update({
      where: { id: parent.id },
      data: {
        hashedRefreshToken: await bcrypt.hash(refreshToken, 7),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: parent.id, accessToken };
  }

  async loginAdmin(loginAdmindto: LoginAdminDto, res: Response) {
    const admin = await this.prisma.admins.findUnique({
      where: { email: loginAdmindto.email },
    });

    if (!admin) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }
    if (admin.is_active == false) {
      throw new ForbiddenException(
        "Siz faol foydalanuvchi emassiz.Avval ro'yxatdan o'ting"
      );
    }

    const isMatched = await bcrypt.compare(
      loginAdmindto.password,
      admin.hashedPassword
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri.");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);

    await this.prisma.admins.update({
      where: { id: admin.id },
      data: {
        hashedRefreshToken: await bcrypt.hash(refreshToken, 7),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: admin.id, accessToken };
  }

  async refreshTokenParent(readonlyFromCookie: string, res: Response) {
    const decodedToken = await this.jwtService.decode(readonlyFromCookie);
    if (!decodedToken) {
      throw new NotFoundException("Parent not  found");
    }

    const parent = await this.prisma.parents.findUnique({
      where: { id: decodedToken["id"] },
    });
    if (!parent || !parent.hashedRefreshToken) {
      throw new NotFoundException("Admin not  found");
    }
    const toMatch = await bcrypt.compare(
      readonlyFromCookie,
      parent.hashedRefreshToken
    );
    if (!toMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } = await this.generateTokens(parent);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prisma.parents.update({
      where: { id: parent.id },
      data: {
        hashedRefreshToken,
      },
    });

    res.cookie("refeshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Parent refreshed",
      adminId: parent.id,
      accessToken: accessToken,
    };
    return response;
  }

  async refreshTokenAdmin(readonlyFromCookie: string, res: Response) {
    const decodedToken = await this.jwtService.decode(readonlyFromCookie);
    if (!decodedToken) {
      throw new NotFoundException("Admin not  found");
    }

    const admin = await this.prisma.admins.findUnique({
      where: { id: decodedToken["id"] },
    });
    if (!admin || !admin.hashedRefreshToken) {
      throw new NotFoundException("Admin not  found");
    }
    const toMatch = await bcrypt.compare(
      readonlyFromCookie,
      admin.hashedRefreshToken
    );
    if (!toMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } = await this.generateTokens(admin);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prisma.admins.update({
      where: { id: admin.id },
      data: {
        hashedRefreshToken,
      },
    });

    res.cookie("refeshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Admin refreshed",
      adminId: admin.id,
      accessToken: accessToken,
    };
    return response;
  }

  async logoutParent(refreshToken: string, res: Response) {
    let parentData: any;
    try {
      parentData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!parentData) {
      throw new ForbiddenException("User not verified");
    }
    await this.prisma.parents.update({
      where: { id: parentData["id"] },
      data: {
        hashedRefreshToken: "",
      },
    });

    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }

  async logoutAdmin(refreshToken: string, res: Response) {
    let adminData: any;
    try {
      adminData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!adminData) {
      throw new ForbiddenException("User not verified");
    }
    await this.prisma.admins.update({
      where: { id: adminData["id"] },
      data: {
        hashedRefreshToken: "",
      },
    });

    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }

  async loginDerictor(loginDerictorDto: LoginDirectorDto, res: Response) {
    const { ID, password } = loginDerictorDto;
    const derictor = await this.prisma.teachers.findUnique({
      where: { ID },
    });

    if (!derictor) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    const isMatched = await bcrypt.compare(password, derictor.hashedPassword);

    if (!isMatched) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } =
      await this.generateTokensWithoutEmail(derictor);

    await this.prisma.directors.update({
      where: { id: derictor.id },
      data: {
        hashedRefreshToken: await bcrypt.hash(refreshToken, 7),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: derictor.id, accessToken };
  }
  async loginTeacher(loginTeacherDto: LoginTeacherDto, res: Response) {
    const teacher = await this.prisma.teachers.findUnique({
      where: { ID: loginTeacherDto.ID },
    });

    if (!teacher) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      loginTeacherDto.password,
      teacher.hashedPassword
    );

    if (!isMatched) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } =
      await this.generateTokensWithoutEmail(teacher);

    await this.prisma.teachers.update({
      where: { id: teacher.id },
      data: {
        hashedRefreshToken: await bcrypt.hash(refreshToken, 7),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: teacher.id, accessToken };
  }

  async refreshTokenTeacher(readonlyFromCookie: string, res: Response) {
    const decodedToken = await this.jwtService.decode(readonlyFromCookie);
    if (!decodedToken) {
      throw new NotFoundException("Teacher not  found");
    }

    const teacher = await this.prisma.teachers.findUnique({
      where: { id: decodedToken["id"] },
    });
    if (!teacher || !teacher.hashedRefreshToken) {
      throw new NotFoundException("Admin not  found");
    }
    const toMatch = await bcrypt.compare(
      readonlyFromCookie,
      teacher.hashedRefreshToken
    );
    if (!toMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } = await this.generateTokens(teacher);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prisma.teachers.update({
      where: { id: teacher.id },
      data: {
        hashedRefreshToken,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Teacher refreshed",
      teacherId: teacher.id,
      accessToken: accessToken,
    };
    return response;
  }

  async logoutTeacher(refreshToken: string, res: Response) {
    let teacherData: any;
    try {
      teacherData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!teacherData) {
      throw new ForbiddenException("User not verified");
    }
    await this.prisma.teachers.update({
      where: { id: teacherData["id"] },
      data: {
        hashedRefreshToken: "",
      },
    });

    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }

  async loginStudent(loginStudentDto: LoginStudentDto, res: Response) {
    const student = await this.prisma.students.findUnique({
      where: { ID: loginStudentDto.ID },
    });

    if (!student) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      loginStudentDto.password,
      student.hashedPassword
    );

    if (!isMatched) {
      throw new UnauthorizedException("Login yoki parol noto'g'ri");
    }

    const { accessToken, refreshToken } =
      await this.generateTokensWithoutEmail(student);

    await this.prisma.students.update({
      where: { id: student.id },
      data: {
        hashedRefreshToken: await bcrypt.hash(refreshToken, 7),
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: student.id, accessToken };
  }

  async refreshTokenStudent(readonlyFromCookie: string, res: Response) {
    const decodedToken = await this.jwtService.decode(readonlyFromCookie);
    if (!decodedToken) {
      throw new NotFoundException("Student not  found");
    }

    const student = await this.prisma.students.findUnique({
      where: { id: decodedToken["id"] },
    });
    if (!student || !student.hashedRefreshToken) {
      throw new NotFoundException("Student not  found");
    }
    const toMatch = await bcrypt.compare(
      readonlyFromCookie,
      student.hashedRefreshToken
    );
    if (!toMatch) {
      throw new ForbiddenException("Forbidden");
    }
    const { accessToken, refreshToken } = await this.generateTokens(student);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.prisma.students.update({
      where: { id: student.id },
      data: {
        hashedRefreshToken,
      },
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    const response = {
      message: "Student refreshed",
      studentId: student.id,
      accessToken: accessToken,
    };
    return response;
  }

  async logoutStudent(refreshToken: string, res: Response) {
    let studentData: any;
    try {
      studentData = await this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    if (!studentData) {
      throw new ForbiddenException("User not verified");
    }
    await this.prisma.teachers.update({
      where: { id: studentData["id"] },
      data: {
        hashedRefreshToken: "",
      },
    });

    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }
}
