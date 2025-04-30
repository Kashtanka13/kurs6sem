import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Admin } from '../entities/admin.entity';

interface JwtPayload {
  email: string;
  sub: number;
  role: string;
  type: 'user' | 'admin';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: JwtPayload) {
    try {
      if (payload.type === 'admin') {
        const admin = await this.adminRepository.findOne({
          where: { id: String(payload.sub) }, // ← вот это ключевой момент
        });
        if (admin) {
          return { id: admin.id, email: admin.email, type: 'admin' };
        }
      } else {
        const user = await this.userRepository.findOne({
          where: { id: payload.sub },
        });
        if (user) {
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            type: 'user',
          };
        }
      }
      throw new UnauthorizedException('Invalid token');
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
