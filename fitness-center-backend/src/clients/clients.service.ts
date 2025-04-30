import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto, UpdateClientDto } from './dto/clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async findOneById(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({ where: { id } });
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  create(data: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(data);
    return this.clientsRepository.save(client);
  }

  async update(id: number, data: UpdateClientDto): Promise<Client> {
    await this.clientsRepository.update(id, data);
    return this.findOneById(id);
  }

  async remove(id: number): Promise<void> {
    await this.clientsRepository.delete(id);
  }
}
