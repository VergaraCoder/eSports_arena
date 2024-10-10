import { Module } from '@nestjs/common';
import { ResultsGamesService } from './results-games.service';
import { ResultsGamesController } from './results-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsGame } from './entities/results-game.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PlayersModule } from 'src/players/players.module';
import { PendingGamesModule } from 'src/pending_games/pending_games.module';
import { validateDataFilterResultGame } from './filterData/filter.data';
import { TournamentPlayerModule } from 'src/tournament-player/tournament-player.module';
import { PositionsModule } from 'src/positions/positions.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ResultsGame]),
    TournamentsModule,
    PlayersModule,
    PendingGamesModule,
    TournamentPlayerModule,
    PositionsModule
  ],
  controllers: [ResultsGamesController],
  providers: [
    ResultsGamesService,
    validateDataFilterResultGame
  ],
})
export class ResultsGamesModule {}
