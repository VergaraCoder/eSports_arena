import { Module } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { PositionsController } from './positions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Position
    ]),
    TournamentsModule,
    PlayersModule
  ],
  controllers: [PositionsController],
  providers: [PositionsService],
})
export class PositionsModule {}
