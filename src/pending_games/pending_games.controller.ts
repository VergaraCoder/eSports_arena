import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PendingGamesService } from './pending_games.service';
import { CreatePendingGameDto } from './dto/create-pending_game.dto';
import { UpdatePendingGameDto } from './dto/update-pending_game.dto';

@Controller('pending-games')
export class PendingGamesController {
  constructor(private readonly pendingGamesService: PendingGamesService) {}

  @Post(":id")
  createGames(@Param("id") idTournamet:string,@Body() data:any) {
    return this.pendingGamesService.create(+idTournamet,data);
  }

  @Get()
  findAll() {
    return this.pendingGamesService.findAll();
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
