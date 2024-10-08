import { PartialType } from '@nestjs/mapped-types';
import { CreateResultsGameDto } from './create-results-game.dto';

export class UpdateResultsGameDto extends PartialType(CreateResultsGameDto) {}
