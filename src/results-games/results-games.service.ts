import { Injectable } from '@nestjs/common';
import { CreateResultsGameDto } from './dto/create-results-game.dto';
import { UpdateResultsGameDto } from './dto/update-results-game.dto';

@Injectable()
export class ResultsGamesService {
  create(createResultsGameDto: CreateResultsGameDto) {
    return 'This action adds a new resultsGame';
  }

  findAll() {
    return `This action returns all resultsGames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resultsGame`;
  }

  update(id: number, updateResultsGameDto: UpdateResultsGameDto) {
    return `This action updates a #${id} resultsGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} resultsGame`;
  }
}
