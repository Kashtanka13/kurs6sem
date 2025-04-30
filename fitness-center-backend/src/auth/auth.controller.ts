import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RegisterDto,
  AdminLoginDto,
  AdminRegisterDto,
} from './dto/auth.dto';
import { UpdateUserRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('admin/login')
  async adminLogin(@Body() dto: AdminLoginDto) {
    const admin = await this.authService.validateAdmin(dto.email, dto.password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(admin);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const existingUser = await this.authService.validateUser(
      dto.email,
      dto.password,
    );
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const user = await this.authService.register(dto);
    return { message: 'User registered successfully', user };
  }

  @Post('admin/register')
  async registerAdmin(@Body() dto: AdminRegisterDto) {
    const existingAdmin = await this.authService.validateAdmin(
      dto.email,
      dto.password,
    );
    if (existingAdmin) {
      throw new HttpException('Admin already exists', HttpStatus.CONFLICT);
    }
    const admin = await this.authService.registerAdmin(dto);
    return { message: 'Admin registered successfully', admin };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put('user/:id/role')
  async updateUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRoleDto,
  ) {
    const user = await this.authService.updateRole(id, dto.role);
    return { message: 'Role updated successfully', user };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('users')
  async findAllUsers() {
    return this.authService.findAllUsers();
  }
}
