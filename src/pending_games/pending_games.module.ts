import { Module } from '@nestjs/common';
import { PendingGamesService } from './pending_games.service';
import { PendingGamesController } from './pending_games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PendingGame } from './entities/pending_game.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PlayersModule } from 'src/players/players.module';
import { TournamentPlayerModule } from 'src/tournament-player/tournament-player.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([PendingGame]),
    TournamentsModule,
    PlayersModule,
    TournamentPlayerModule
  ],
  controllers: [PendingGamesController],
  providers: [PendingGamesService],
  exports:[TypeOrmModule]
})
export class PendingGamesModule {}
