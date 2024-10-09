import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class TournamentsService {

  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository:Repository<Tournament>,

  ){}

  async create(createTournamentDto: CreateTournamentDto) {
    const dataTournament=this.tournamentRepository.create(createTournamentDto);
    await this.tournamentRepository.save(dataTournament);
    return dataTournament;
  }

  async findAll() {
    try{
      const tournaments=await this.tournamentRepository.find();
      if(tournaments.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"TOURNAMENTS NOT FOUND"
        });
      }
      return tournaments;
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
    try{
      const dataTournament=await this.tournamentRepository.findOneBy({id:id});
      if(!dataTournament){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS TOURNAMENT NOT EXIST"
        });
      }
      return dataTournament;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    try{
      const {affected} = await this.tournamentRepository.update(id,updateTournamentDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THAT MESSAGE NOT EXIST"
        });
      }
      return "perfectly updated"
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
