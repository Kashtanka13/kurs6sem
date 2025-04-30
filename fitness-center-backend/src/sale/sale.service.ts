import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../entities/sale.entity';
import { CreateSaleDto } from 'src/entities/dto/create-sale.dto';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  findAll(): Promise<Sale[]> {
    return this.saleRepository.find({ relations: ['client'] });
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    if (!sale) throw new NotFoundException('Sale not found');
    return sale;
  }

  create(data: CreateSaleDto): Promise<Sale> {
    const sale = this.saleRepository.create(data);
    return this.saleRepository.save(sale);
  }

  async update(id: number, data: Partial<CreateSaleDto>): Promise<Sale> {
    await this.saleRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
