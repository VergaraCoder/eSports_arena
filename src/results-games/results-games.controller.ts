import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResultsGamesService } from './results-games.service';
import { CreateResultsGameDto } from './dto/create-results-game.dto';
import { UpdateResultsGameDto } from './dto/update-results-game.dto';

@Controller('results-games')
export class ResultsGamesController {
  constructor(private readonly resultsGamesService: ResultsGamesService) {}

  @Post()
  create(@Body() createResultsGameDto: CreateResultsGameDto) {
    return this.resultsGamesService.create(createResultsGameDto);
  }

  @Get()
  findAll() {
    return this.resultsGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultsGamesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultsGameDto: UpdateResultsGameDto) {
    return this.resultsGamesService.update(+id, updateResultsGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultsGamesService.remove(+id);
  }
}
