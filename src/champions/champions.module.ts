import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsController } from './champions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Champion } from './entities/champion.entity';
import { FilterDataServiceChampion } from './filterData/filterData';
import { PositionsModule } from 'src/positions/positions.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Champion]),
    PositionsModule
  ],
  controllers: [ChampionsController],
  providers: [
    ChampionsService,
    FilterDataServiceChampion
  ],
})
export class ChampionsModule {}
