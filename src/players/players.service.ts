import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class PlayersService {
  
  constructor(
    @InjectRepository(Player)
    private playerRepository:Repository<Player>
  ){}

  async create(createPlayerDto: any) {
    try{
      const verify=await this.findPlayerByNickName(createPlayerDto.nickName,true);   

      
      if(verify && verify.nickName == createPlayerDto.nickName){
        throw new manageError({
          type:"CONFLICT",
          message:"THIS NICKNAME ALREADY EXIST"
        });
      }
      const dataPlayer=this.playerRepository.create(createPlayerDto);
      await this.playerRepository.save(dataPlayer);
      return dataPlayer;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async filterToAddPlayers(data:any){
    try{
      let idsPlayers=[];
      for(const onePlayer of data){
        const querys=await this.findPlayerByNickName(onePlayer.nickName,true);
        if(querys){
          throw new manageError({
            type:"CONFLICT",
            message:`THE NICKNAME ${querys.nickName} ALRREADY IN THIS TOURNAMENT`
          });
        }
        idsPlayers.push()
      }
    }catch(err:any){

    }
  }

  findAll() {
    return `This action returns all players`;
  }

  async findPlayerByNickName(nickName:string,verify?:boolean){
    try{
      console.log("the nick is");
      
      console.log(nickName);
      
      const dataPlayer=await this.playerRepository.findOne({where:{nickName:nickName}});
      if(!dataPlayer && !verify){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THAT PLAYER NOT EXIST WITH THIS NICKNAME"
        });
      }
      return dataPlayer;
    }catch(err:any){ 
      throw manageError.signedError(err.message);
    }
  }

  findOne(id: number) {
    try{
      //const 
    }catch(err:any){

    }
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
