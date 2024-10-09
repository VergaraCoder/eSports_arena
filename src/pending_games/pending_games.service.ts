import { Injectable } from '@nestjs/common';
import { CreatePendingGameDto } from './dto/create-pending_game.dto';
import { UpdatePendingGameDto } from './dto/update-pending_game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PendingGame } from './entities/pending_game.entity';
import { Repository } from 'typeorm';
import { TournamentPlayerService } from 'src/tournament-player/tournament-player.service';
import { PlayersService } from 'src/players/players.service';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class PendingGamesService {
  
  constructor(
    @InjectRepository(PendingGame)
    private pendigGameRepository:Repository<PendingGame>,
    private tournamentPlayerService:TournamentPlayerService,
    private playerService:PlayersService
  ){}

  async create(data:any) {
    try{
      const dataPlayers=await this.tournamentPlayerService.findAll(data.idTournament);

      
      const dataToCreate=await this.randomOrder(dataPlayers);
      
      console.log(dataToCreate);
      let count=0;
      let rivals=[];
      while(dataToCreate.length+2 > count){

        if(rivals.length==2){
          console.log("enter to create");
          console.log(rivals);
          
          const player1=await this.playerService.findPlayerByNickName(rivals[0],true); 

          const player2=await this.playerService.findPlayerByNickName(rivals[1],true); 
  
          const gameCreated=this.pendigGameRepository.create({
            player1Id:player1.id,
            player2Id:player2.id,
            tournamentId:data.idTournament,
            date:data.date
          });
          await this.pendigGameRepository.save(gameCreated);
          rivals=[];
        }
        else{
          rivals.push(dataToCreate[count]);
          count++;
        }
      }

      return dataToCreate;
      
    }catch(err:any){
      throw err;
    }
  }


  async randomOrder(dataPlayers:any){

    const cant=dataPlayers.length;
    let everyOnePlayers=[];

    while(everyOnePlayers.length<cant){
      const quantity=dataPlayers.length;
      let numberPlayer1=Math.round(Math.random()*quantity);
      numberPlayer1 > quantity ? numberPlayer1-1 : numberPlayer1;
      
      if(dataPlayers[numberPlayer1]!==undefined){
        everyOnePlayers.push(dataPlayers[numberPlayer1].player.nickName);         
      }        
      dataPlayers.splice(numberPlayer1,1);
    }

    return everyOnePlayers;
  }
  async findAll(idTournament:number) {
    try{  
      const games=await this.pendigGameRepository.find({where:{tournamentId:idTournament}});
      if(games.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE REGISTERS"
        });
      }
      return games;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
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
