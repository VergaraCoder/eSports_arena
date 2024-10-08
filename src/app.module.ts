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

@Module({
  imports: [UsersModule, RolesModule, TournamentsModule, PlayersModule, PendingGamesModule, PositionsModule, ResultsGamesModule, ChampionsModule, AuthModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
