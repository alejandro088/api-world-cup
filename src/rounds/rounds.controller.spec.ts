import { Round } from './entities/round.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { RoundsController } from './rounds.controller';
import { RoundsService } from './rounds.service';
import { Repository } from 'typeorm';

describe('RoundsController', () => {
  let controller: RoundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoundsController],
      providers: [RoundsService, 
        {
          provide: getRepositoryToken(Round),
          useValue: Repository<Round>,
        }],
    }).compile();

    controller = module.get<RoundsController>(RoundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
