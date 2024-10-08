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
      const cant=6;
      let numbers=[];
      let number=0;
      //console.log(dataPlayers);
      while(numbers.length<=cant){
        console.log("VUELTA "+number);
        
        const quantity=dataPlayers.length;
        let numberPlayer1=Math.round(Math.random()*quantity);
        // if(numbers.includes(numberPlayer1)){
        //   while(numbers.includes(numberPlayer1)){
        //    // console.log("la cantidad de registros es ", quantity);
            
        //     //console.log("Array numbers esta" );
        //     //console.log(numbers);
            
            
        //     //console.log(Math.random()*quantity);
            
        //     numberPlayer1=Math.round(Math.random()*quantity);
        //     //console.log(numberPlayer1);
            
        //   }
        // }
        numberPlayer1 > cant ? numberPlayer1-1 : numberPlayer1;
        
        
        numbers.push(numberPlayer1);

        console.log(data[number].player.nickName);
        number++;
        data.splice(numberPlayer1,1);
        console.log("la cuenta va en ");
        
        console.log(numbers.length);
        

        
      }
      
    }catch(err:any){

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
