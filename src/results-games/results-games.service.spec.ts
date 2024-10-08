import { Test, TestingModule } from '@nestjs/testing';
import { ResultsGamesService } from './results-games.service';

describe('ResultsGamesService', () => {
  let service: ResultsGamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResultsGamesService],
    }).compile();

    service = module.get<ResultsGamesService>(ResultsGamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
