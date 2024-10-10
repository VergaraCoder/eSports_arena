import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PendingGamesService } from './pending_games.service';
import { CreatePendingGameDto } from './dto/create-pending_game.dto';
import { UpdatePendingGameDto } from './dto/update-pending_game.dto';
import { Tournament } from 'src/tournaments/entities/tournament.entity';

@Controller('pending-games')
export class PendingGamesController {
  constructor(private readonly pendingGamesService: PendingGamesService) {}

  @Post()
  createGames(@Body() data:any) {
    return this.pendingGamesService.create(data);
  }

  @Post("final")
  async createFinal(@Body() data:any){
    return await this.pendingGamesService.creationOfFinally(data);
  }

  @Get("all/:id")
  findAll(@Param("id") tournament:string) {
    return this.pendingGamesService.findAll(+tournament);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pendingGamesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePendingGameDto: UpdatePendingGameDto) {
    return this.pendingGamesService.update(+id, updatePendingGameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pendingGamesService.remove(+id);
  }
}
