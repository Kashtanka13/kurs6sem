import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from '../entities/membership.entity';
import { CreateMembershipDto } from 'src/entities/dto/create-membership.dto';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
  ) {}

  findAll(): Promise<Membership[]> {
    return this.membershipRepository.find();
  }

  async findOne(id: number): Promise<Membership> {
    const membership = await this.membershipRepository.findOne({
      where: { id },
    });
    if (!membership) throw new NotFoundException('Membership not found');
    return membership;
  }

  create(data: CreateMembershipDto): Promise<Membership> {
    const newMembership = this.membershipRepository.create(data);
    return this.membershipRepository.save(newMembership);
  }

  async update(
    id: number,
    data: Partial<CreateMembershipDto>,
  ): Promise<Membership> {
    await this.membershipRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.membershipRepository.delete(id);
  }
}
