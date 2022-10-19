import { Standing } from './../standings/entities/standing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { Match } from './entities/match.entity';
import { MatchUpdatedListener } from './listeners/match-updated-listener';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Match]), TypeOrmModule.forFeature([Standing])],
  controllers: [MatchesController],
  providers: [MatchesService, MatchUpdatedListener]
})
export class MatchesModule {}
