import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoundDto } from './dto/create-round.dto';
import { UpdateRoundDto } from './dto/update-round.dto';
import { Round } from './entities/round.entity';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private roundsRepository: Repository<Round>,
  ) {}

  async create(createRoundDto: CreateRoundDto) {
    console.log(createRoundDto);
    const round = new Round()
    round.title = createRoundDto.title
    round.start_at = createRoundDto.start_at
    round.end_at = createRoundDto.end_at
    console.log(round)
    const res = await this.roundsRepository.save(round)
    return res;
  }

  findAll(): Promise<Round[]> {
    return this.roundsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} round`;
  }

  update(id: number, updateRoundDto: UpdateRoundDto) {
    return this.roundsRepository.update(id, updateRoundDto)
  }

  remove(id: number) {
    return `This action removes a #${id} round`;
  }
}
