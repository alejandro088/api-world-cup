import { StandingsModule } from './standings/standings.module';
import { Standing } from './standings/entities/standing.entity';
import { Match } from './matches/entities/match.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamsModule } from './teams/teams.module';
import { MatchesModule } from './matches/matches.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './teams/entities/team.entity';
import { DataSource } from 'typeorm';
import { LoggerModule } from 'nestjs-pino';
import { GroupsModule } from './groups/groups.module';
import { Group } from './groups/entities/group.entity';
import { RoundsModule } from './rounds/rounds.module';
import { Round } from './rounds/entities/round.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';



@Module({
  imports: [EventEmitterModule.forRoot(), TeamsModule, MatchesModule, GroupsModule, StandingsModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mysecretpw',
    database: 'nest',
    entities: [Team, Group, Round, Match, Standing],
    synchronize: true,
  }),LoggerModule.forRoot(), GroupsModule, RoundsModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
