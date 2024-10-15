import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get()
  findAll() {
    return this.positionsService.findAll();
  }

  @Get("one")
  async findOneByHigtScore(
    @Query("idTournament") tournament:number
  ){
    return await this.positionsService.findOneScoreByTournament({idTournament:tournament});
  }
  
  @Get(":id")
  findAllByTournamentId(
    @Param("id") id:number
  ) {
    return this.positionsService.findAllByTournamentId(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.positionsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionsService.update(+id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionsService.remove(+id);
  }
}
