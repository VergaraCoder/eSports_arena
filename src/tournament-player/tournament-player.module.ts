import { Module } from '@nestjs/common';
import { TournamentPlayerService } from './tournament-player.service';
import { TournamentPlayerController } from './tournament-player.controller';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PlayersModule } from 'src/players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterDataServiceTournamentPlayer } from './filterData/filter.data';
import { TournamentPlayer } from './entities/tournament-player.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      TournamentPlayer
    ]),
    TournamentsModule,
    PlayersModule
  ],
  controllers: [TournamentPlayerController],
  providers: [
    TournamentPlayerService,
    FilterDataServiceTournamentPlayer
  ],
  exports:[
    TournamentPlayerService
  ]
})
export class TournamentPlayerModule {}
