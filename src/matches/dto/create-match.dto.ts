import { Round } from './../../rounds/entities/round.entity';
import { Group } from './../../groups/entities/group.entity';
import { Team } from './../../teams/entities/team.entity';  
import { Type } from 'class-transformer';
import { IsDate, IsNumber } from 'class-validator';
import { Optional } from '@nestjs/common';
export class CreateMatchDto {
    @Type(() => Date)
    @Optional()
    @IsDate()
    play_at: Date;

    @IsNumber()
    @Optional()
    team1Id: Team;

    @IsNumber()
    @Optional()
    team2Id: Team;

    @IsNumber()
    @Optional()
    groupId: Group;

    @IsNumber()
    @Optional()
    roundId: Round;

    @IsNumber()
    resultTeam1: number;

    @IsNumber()
    resultTeam2: number;
}
