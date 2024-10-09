import { Injectable } from '@nestjs/common';
import { CreatePendingGameDto } from './dto/create-pending_game.dto';
import { UpdatePendingGameDto } from './dto/update-pending_game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PendingGame } from './entities/pending_game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PendingGamesService {
  
  constructor(
    @InjectRepository(PendingGame)
    private pendigGameRepository:Repository<PendingGame>
  ){}

  async create(idTournament:number,data?:any) {
    try{
      const dataPlayers=data;
      const cant=data.length;
      let everyOnePlayers=[];
      while(everyOnePlayers.length<cant){
        const quantity=dataPlayers.length;
        let numberPlayer1=Math.round(Math.random()*quantity);
        numberPlayer1 > quantity ? numberPlayer1-1 : numberPlayer1;
        
        if(data[numberPlayer1]!==undefined){
          everyOnePlayers.push(data[numberPlayer1].player.nickName);         
        }        
        data.splice(numberPlayer1,1);
      }

      for(const x of everyOnePlayers){
        
      }
      return everyOnePlayers;
      
    }catch(err:any){
      throw err;
    }
  }

  async findAll() {
    return `This action returns all pendingGames`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pendingGame`;
  }

  update(id: number, updatePendingGameDto: UpdatePendingGameDto) {
    return `This action updates a #${id} pendingGame`;
  }

  remove(id: number) {
    return `This action removes a #${id} pendingGame`;
  }
}
