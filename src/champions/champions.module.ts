import { Module } from '@nestjs/common';
import { ChampionsService } from './champions.service';
import { ChampionsController } from './champions.controller';

@Module({
  controllers: [ChampionsController],
  providers: [ChampionsService],
})
export class ChampionsModule {}
