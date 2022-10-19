import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { QueryBuilder, Repository } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';
import { MatchUpdatedEvent } from './events/match-updated-event';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
    private eventEmitter: EventEmitter2
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const match = new Match();
    match.play_at = createMatchDto.play_at;
    match.team1 = createMatchDto.team1Id;
    match.team2 = createMatchDto.team2Id;
    match.group = createMatchDto.groupId;
    match.round = createMatchDto.roundId;
    const res = await this.matchesRepository.save(match);
    return res;
  }

  upsert(request: Request) {
    console.log(request.body);

    request.body.forEach(async (element) => {
      const match = new Match();
      match.play_at = element.play_at;
      match.team1 = element.team1Id;
      match.team2 = element.team2Id;
      match.group = element.groupId;
      match.round = element.roundId;
      const res = await this.matchesRepository.save(match);
    });
  }

  findAll() {
    return `This action returns all matches`;
  }

  async findOne(id: number) {
    
    const res = await this.matchesRepository.findOne({
      where: {
        id: id,
      }
    });
    return res;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {

    const matchUpdatedEvent = new MatchUpdatedEvent();
    console.log(updateMatchDto);

    await this.matchesRepository.update(id, updateMatchDto);
    matchUpdatedEvent.id = id;
    matchUpdatedEvent.resultTeam1 = updateMatchDto.resultTeam1;
    matchUpdatedEvent.resultTeam2 = updateMatchDto.resultTeam2;
    this.eventEmitter.emit('match.updated', matchUpdatedEvent);

    

    return { message: "OK" }
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
