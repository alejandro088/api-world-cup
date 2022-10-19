import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Request } from 'express';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) {}
  
  async create(createTeamDto: CreateTeamDto) {
    const team = new Team()
    team.name = createTeamDto.name
    const res = await this.teamsRepository.save(team)
    return res;
  }

  findAll(): Promise<Team[]> {
    return this.teamsRepository.find();
  }

  findOne(id: number): Promise<Team> {
    return this.teamsRepository.findOneBy({ id });
  }

  upsert(request: Request) {
    console.log(request.body);
    this.teamsRepository.createQueryBuilder().insert()
    .into(Team)
    .values(
      request.body,
    )
    .execute()
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamsRepository.update(id, updateTeamDto)
  }

  async remove(id: number) {

    const team = await this.teamsRepository.findOneBy({
      id: id,
    })

    return this.teamsRepository.remove(team)
  }
}
