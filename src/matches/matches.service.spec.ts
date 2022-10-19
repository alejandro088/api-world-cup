import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { MatchesService } from './matches.service';

const repositoryMockFactory = jest.fn(() => ({
  findOne: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      metadata: {
        columns: ["team1"],
        relations: [],
      },
    });
  }),
  // ...
}));

const oneTodo: Match = plainToClass(Match, { id: 1, team1: "Argentina", team2: "Brasil", resultTeam1: 0, resultTeam2: 0 });


const mockedRepo = {
  // mock the repo `findOneOrFail`
  findOne: jest.fn((id) => Promise.resolve(oneTodo)),
};

const mockEmployeesRepository = {
  findOne: jest.fn().mockImplementation(() => {
    return Promise.resolve({
      metadata: {
        columns: ["team1"],
        relations: [],
      },
    });
  }),
};


const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
}));

describe('MatchesService', () => {
  let service: MatchesService;
  let repository: Repository<Match>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchesService,
        {
          provide: getRepositoryToken(Match),
          useValue: mockedRepo,
        }],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data from a specific match', async () => {

    const res = await service.findOne(1);
    expect(res).toHaveProperty(['team1'])
    expect(res).toHaveProperty(['team2'])
    expect(res).toHaveProperty(['resultTeam1'])
    expect(res).toHaveProperty(['resultTeam2'])
  })
});;
