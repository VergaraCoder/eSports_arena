import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './entities/position.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class PositionsService {

  constructor(
    @InjectRepository(Position)
    private positionRepository:Repository<Position>
  ){}

  async create(createPosition: any) {
    try{
      const dataPlayer=this.positionRepository.create(createPosition);
      await this.positionRepository.save(dataPlayer);
      return dataPlayer;
    }catch(err:any){
      throw err;
    }
  }

  findAll() {
    return `This action returns all positions`;
  }


  async findAllByTournamentId(IdTournament:number){
    try{
      const alls=await this.positionRepository.findBy({tournamentId:IdTournament});
      if(alls.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE REGISTER FOR MAKE CHAMPION."
        });
      }
      return alls;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOneByScore(tournamentId: number,score:number) {
    try{
      const data=await this.positionRepository.findBy({tournamentId:tournamentId, score:score});
      if(!data){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT POSITION WITH THAT TOURNAMENTID AND THAT SCORE. "
        });
      }
      return data;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOneByPlayerId(idPlayer: number) {
    const data= await this.positionRepository.findOneBy({playerId:idPlayer});
    if(data){
      return {
        id:data.id,
        score:data.score
      }
    }else{
      return {};
    }
  }

  async update(id: number, updatePositionDto: UpdatePositionDto) {
    try{
      const {affected} =await this.positionRepository.update(id,updatePositionDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO UPDATE POSITION."
        });
      }
      return "perfectly updated";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
