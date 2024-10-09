import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';
import { FilterDataService } from './filterData/filter.data';

@Injectable()
export class TournamentsService {

  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository:Repository<Tournament>,
    private FilterData:FilterDataService
  ){}

  async create(createTournamentDto: CreateTournamentDto) {
    return 'This action adds a new tournament';
  }

  async findAll(querys?:any) {
    try{
      if(Object.values(querys).every(item=>item !== undefined)){
        return await this.FilterData.returnResults(this.tournamentRepository,querys);
      }
      const tournaments=await this.tournamentRepository.find();
      if(tournaments.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"TOURNAMENTS NOT FOUND"
        });
      }
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async createPlayersOfTournament(data:any){
    try{
      for(const player of data){
        //const dataQuerys
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
