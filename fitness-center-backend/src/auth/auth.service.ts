import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User, UserRole } from '../entities/user.entity';
import { Admin } from '../entities/admin.entity';

export interface UserPayload {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  type: 'user' | 'admin';
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserPayload | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { id, email, firstName, lastName, role } = user;
      return { id, email, firstName, lastName, role, type: 'user' };
    }
    return null;
  }

  async validateAdmin(
    email: string,
    password: string,
  ): Promise<UserPayload | null> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      return { id: Number(admin.id), email: admin.email, type: 'admin' };
    }
    return null;
  }

  login(user: UserPayload) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      type: user.type,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(userData: Partial<User>): Promise<User> {
    if (!userData.email || !userData.password) {
      throw new BadRequestException('Email and password are required');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async registerAdmin(adminData: Partial<Admin>): Promise<Admin> {
    if (!adminData.email || !adminData.password) {
      throw new BadRequestException('Email and password are required');
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    const admin = this.adminRepository.create({
      ...adminData,
      password: hashedPassword,
    });

    return this.adminRepository.save(admin);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateRole(userId: number, newRole: UserRole): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = newRole;
    return this.userRepository.save(user);
  }
}
