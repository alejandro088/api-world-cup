import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStandingDto } from './dto/create-standing.dto';
import { UpdateStandingDto } from './dto/update-standing.dto';
import { Standing } from './entities/standing.entity';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private roundsRepository: Repository<Standing>,
  ) {}

  async create(createRoundDto: CreateStandingDto) {
    console.log(createRoundDto);
    const round = new Standing()
    //round.title = createRoundDto.title
    //round.start_at = createRoundDto.start_at
    //round.end_at = createRoundDto.end_at
    console.log(round)
    const res = await this.roundsRepository.save(round)
    return res;
  }

  findAll(): Promise<Standing[]> {
    return this.roundsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} round`;
  }

  update(id: number, updateRoundDto: UpdateStandingDto) {
    //return this.roundsRepository.update(id, updateRoundDto)
  }

  remove(id: number) {
    return `This action removes a #${id} round`;
  }
}
