import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TournamentPlayerService } from './tournament-player.service';
import { CreateTournamentPlayerDto } from './dto/create-tournament-player.dto';
import { UpdateTournamentPlayerDto } from './dto/update-tournament-player.dto';

@Controller('tournament-player')
export class TournamentPlayerController {
  constructor(private readonly tournamentPlayerService: TournamentPlayerService) {}

  @Post()
  create(@Body() createTournamentPlayerDto: CreateTournamentPlayerDto) {
    return this.tournamentPlayerService.create(createTournamentPlayerDto);
  }

  @Get("all/:tournamebtId")
  findAll(@Param("tournamebtId") idTour:string) {
    return this.tournamentPlayerService.findAll(+idTour);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentPlayerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTournamentPlayerDto: UpdateTournamentPlayerDto) {
    //return this.tournamentPlayerService.update(+id, updateTournamentPlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    //return this.tournamentPlayerService.remove(+id);
  }
}
