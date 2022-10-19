import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Round } from './entities/round.entity';
import { RoundsService } from './rounds.service';

describe('RoundsService', () => {
  let service: RoundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoundsService, 
        {
          provide: getRepositoryToken(Round),
          useValue: Repository<Round>,
        }],
    }).compile();

    service = module.get<RoundsService>(RoundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
