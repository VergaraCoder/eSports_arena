import { Injectable } from '@nestjs/common';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Champion } from './entities/champion.entity';
import { Repository } from 'typeorm';
import { FilterDataServiceChampion } from './filterData/filterData';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class ChampionsService {

  constructor(
    @InjectRepository(Champion)
    private championRepository:Repository<Champion>,
    private filterData:FilterDataServiceChampion
  ){}

  async create(createChampion: any) {
    try{
      const theMostBig=await this.filterData.returnTheHihgtsScore(createChampion.idTournament);

      const dataCreated=this.championRepository.create({
        playerId:theMostBig.playerId,
        tournamentId:theMostBig.tournamentId
      });
      await this.championRepository.save(dataCreated);
      return dataCreated;
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    try{
      const championsOfTournaments= await this.championRepository.find();
      if(championsOfTournaments.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE REGISTERS OF CHAMPIONS."
        });
      }
      return championsOfTournaments;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const oneChampion=await this.championRepository.findOneBy({id:id});
      if(!oneChampion){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS ID CHAMPION NOT FONUND ."
        });
      }
      return oneChampion;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOneChampionofTournamentId(idTournament:number){
    try{
      const oneChampionOfTournament=await this.championRepository.findOneBy({tournamentId:idTournament});
      if(!oneChampionOfTournament){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THAT TORUNAMENT ID NOT FOUND ."
        });
      }
      return oneChampionOfTournament;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateChampionDto: UpdateChampionDto) {
    try{
      const {affected}=await this.championRepository.update(id,updateChampionDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT FOUND REGISTER."
        });
      }
      return "PERFECTLY UPDATED ."
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected} = await this.championRepository.delete(id);
    if(affected==0){
      throw new manageError({
        type:"NOT_FOUND",
        message:"THIS CHAMPION ID NOT FOUND ."
      });
    }
    return "PERFECTLY DELETED";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
