import { Test, TestingModule } from '@nestjs/testing';
import { TournamentPlayerController } from './tournament-player.controller';
import { TournamentPlayerService } from './tournament-player.service';

describe('TournamentPlayerController', () => {
  let controller: TournamentPlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentPlayerController],
      providers: [TournamentPlayerService],
    }).compile();

    controller = module.get<TournamentPlayerController>(TournamentPlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
