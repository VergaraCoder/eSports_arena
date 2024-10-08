import { Test, TestingModule } from '@nestjs/testing';
import { ResultsGamesController } from './results-games.controller';
import { ResultsGamesService } from './results-games.service';

describe('ResultsGamesController', () => {
  let controller: ResultsGamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResultsGamesController],
      providers: [ResultsGamesService],
    }).compile();

    controller = module.get<ResultsGamesController>(ResultsGamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
