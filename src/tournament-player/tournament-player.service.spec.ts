import { Test, TestingModule } from '@nestjs/testing';
import { TournamentPlayerService } from './tournament-player.service';

describe('TournamentPlayerService', () => {
  let service: TournamentPlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentPlayerService],
    }).compile();

    service = module.get<TournamentPlayerService>(TournamentPlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
