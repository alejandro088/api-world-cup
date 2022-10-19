import { UpdateStandingDto } from './../../standings/dto/update-standing.dto';
import { Standing } from './../../standings/entities/standing.entity';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from '../entities/match.entity';
import { MatchUpdatedEvent } from '../events/match-updated-event';

@Injectable()
export class MatchUpdatedListener {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
    @InjectRepository(Standing)
    private standingsRepository: Repository<Standing>,
  ) {}

  @OnEvent('match.updated')
  async handleOrderCreatedEvent(event: MatchUpdatedEvent) {
    const res = await this.matchesRepository.findOne({
      where: { id: event.id },
    });
    console.log(res);

    const stadingRes = await this.standingsRepository.findOne({
      where: { teamId: res.team1Id, groupId: res.groupId, roundId: res.roundId },
    });

    let points = 0;

    if (event.resultTeam1 > event.resultTeam2) {
      points = stadingRes?.points + 3;
    } else if (event.resultTeam1 < event.resultTeam2) {
      points = stadingRes?.points || 0;
    } else {
      points = stadingRes?.points + 1 || 1;
    }

    let draw =
      event.resultTeam1 == event.resultTeam2
        ? stadingRes?.drawn + 1 || 1
        : stadingRes?.drawn || 0;
    let win =
      event.resultTeam1 > event.resultTeam2 ? stadingRes?.won + 1 || 1 : stadingRes?.won || 0;
    let losser =
      event.resultTeam1 < event.resultTeam2
        ? stadingRes?.lost + 1 || 1  
        : stadingRes?.lost || 0;

    console.log(res);

    const updateStandingDto = new UpdateStandingDto()
    updateStandingDto.id = stadingRes.id
    updateStandingDto.teamId = res.team1Id
    updateStandingDto.groupId = res.groupId
    updateStandingDto.roundId = res.roundId
    updateStandingDto.rank = 1
    updateStandingDto.points = points
    updateStandingDto.matches_played = stadingRes?.matches_played + 1 || 1
    updateStandingDto.goal_diff = stadingRes?.goal_diff + event.resultTeam1 - event.resultTeam2 || event.resultTeam1 - event.resultTeam2
    updateStandingDto.goals_scored = stadingRes?.goals_scored + event.resultTeam1 || event.resultTeam1
    updateStandingDto.goals_conceded = stadingRes?.goals_conceded + event.resultTeam2 || event.resultTeam2
    updateStandingDto.won = win
    updateStandingDto.drawn = draw
    updateStandingDto.lost = losser

    console.log(updateStandingDto);

    await this.standingsRepository.save(updateStandingDto);

    // await this.standingsRepository.save({
    //   updateStandingDto,
    //   rank: 1,
    //   points: points,
    //   matches_played: stadingRes?.matches_played + 1 || 1,
    //   goal_diff: stadingRes?.goal_diff + event.resultTeam1 - event.resultTeam2 || event.resultTeam1 - event.resultTeam2,
    //   goals_scored: stadingRes?.goals_scored + event.resultTeam1 || event.resultTeam1,
    //   goals_conceded: stadingRes?.goals_conceded + event.resultTeam2 || event.resultTeam2,
    //   won: win,
    //   drawn: draw,
    //   lost: losser
    // });
    console.log(event);
  }
}
