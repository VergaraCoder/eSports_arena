import { forwardRef, Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tournament]),
  ],
  controllers: [TournamentsController],
  providers: [
    TournamentsService,
  ],
  exports:[
    TypeOrmModule,
    TournamentsService
  ]
})
export class TournamentsModule {}
