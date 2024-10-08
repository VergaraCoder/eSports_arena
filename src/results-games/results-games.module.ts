import { Module } from '@nestjs/common';
import { ResultsGamesService } from './results-games.service';
import { ResultsGamesController } from './results-games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsGame } from './entities/results-game.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PlayersModule } from 'src/players/players.module';
import { PendingGamesModule } from 'src/pending_games/pending_games.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ResultsGame]),
    TournamentsModule,
    PlayersModule,
    PendingGamesModule
  ],
  controllers: [ResultsGamesController],
  providers: [ResultsGamesService],
})
export class ResultsGamesModule {}
