import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { PlayersModule } from './players/players.module';
import { PendingGamesModule } from './pending_games/pending_games.module';
import { PositionsModule } from './positions/positions.module';
import { ResultsGamesModule } from './results-games/results-games.module';
import { ChampionsModule } from './champions/champions.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { credentialsDb } from './common/database/dbConfig/db.config';
import { TournamentPlayerModule } from './tournament-player/tournament-player.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useClass:credentialsDb
    })
    ,UsersModule, RolesModule, TournamentsModule, PlayersModule, PendingGamesModule, PositionsModule, ResultsGamesModule, ChampionsModule, AuthModule, CommonModule, TournamentPlayerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
