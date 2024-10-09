import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentsService {

  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository:Repository<Tournament>
  ){}

  async create(createTournamentDto: CreateTournamentDto) {
    return 'This action adds a new tournament';
  }

  async findAll(querys?:any) {
    try{
      if(Object.values(querys).every(item=>item !== undefined)){

      }
      const tournaments=await this.tournamentRepository.find();
      if(tournaments.length==0){
        //throw new ma
      }
    }catch(err:any){

    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} tournament`;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a #${id} tournament`;
  }

  async remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
