import { forwardRef, Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { TournamentsModule } from 'src/tournaments/tournaments.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Player]),
    forwardRef(()=>TournamentsModule)
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports:[
    TypeOrmModule
  ]
})
export class PlayersModule {}
