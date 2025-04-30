import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { Membership } from '../entities/membership.entity';
import { CreateMembershipDto } from 'src/entities/dto/create-membership.dto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  findAll(): Promise<Membership[]> {
    return this.membershipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Membership> {
    return this.membershipService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateMembershipDto): Promise<Membership> {
    return this.membershipService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<CreateMembershipDto>,
  ): Promise<Membership> {
    return this.membershipService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.membershipService.remove(id);
  }
}
