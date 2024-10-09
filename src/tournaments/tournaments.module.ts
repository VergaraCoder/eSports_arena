import { forwardRef, Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { PlayersModule } from 'src/players/players.module';
import { FilterDataService } from './filterData/filter.data';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tournament]),
    forwardRef(()=>PlayersModule)
  ],
  controllers: [TournamentsController],
  providers: [
    TournamentsService,
    FilterDataService
  ],
  exports:[
    TypeOrmModule
  ]
})
export class TournamentsModule {}
