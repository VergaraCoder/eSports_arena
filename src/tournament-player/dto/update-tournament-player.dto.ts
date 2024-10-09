import { PartialType } from '@nestjs/mapped-types';
import { CreateTournamentPlayerDto } from './create-tournament-player.dto';

export class UpdateTournamentPlayerDto extends PartialType(CreateTournamentPlayerDto) {}
