import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Standing } from './entities/standing.entity';
import { StandingsController } from './standings.controller';
import { StandingsService } from './standings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Standing])],
  controllers: [StandingsController],
  providers: [StandingsService]
})
export class StandingsModule {}
