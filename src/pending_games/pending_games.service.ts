import { Injectable } from '@nestjs/common';
import { CreatePendingGameDto } from './dto/create-pending_game.dto';
import { UpdatePendingGameDto } from './dto/update-pending_game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PendingGame } from './entities/pending_game.entity';
import { Repository } from 'typeorm';
import { TournamentPlayerService } from 'src/tournament-player/tournament-player.service';
import { PlayersService } from 'src/players/players.service';
import { manageError } from 'src/common/errors/custom/manage.error';
import { filterDataServiceGames } from './filterData/filter.data';

@Injectable()
export class PendingGamesService {
  
  constructor(
    @InjectRepository(PendingGame)
    private pendigGameRepository:Repository<PendingGame>,
    private tournamentPlayerService:TournamentPlayerService,
    private playerService:PlayersService,
    private filterData:filterDataServiceGames
  ){}

  async create(data:any) {
    try{

      await this.filterData.verifyTotalPlayer(data.idTournament);

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


  
  async creationOfFinally(data:any){
    try{
      const finalRivals=await this.filterData.validateScore(data.idTournament);
     
      const dataCreated=this.pendigGameRepository.create({
        player1Id:finalRivals[0].playerId,
        player2Id:finalRivals[1].playerId,
        date:data.date,
        tournamentId:data.idTournament
      });
      await this.pendigGameRepository.save(dataCreated);
      return dataCreated;
    }catch(err:any){
      throw err;
    }
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
      return this.organizeData(games);
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }


   organizeData(response:any){
     let response2=[];
      for(const only in response){    
        response2.push({
          player1:response[only].player1,
          player2:response[only].player2
        });
      }
      return response2;
  }


  async findOne(id: number) {
    try{
      const gameOne=await this.pendigGameRepository.findOneBy({id:id});
      if(!gameOne){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE REGISTERS"
        });
      }
      return gameOne;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updatePendingGameDto: UpdatePendingGameDto) {
    return `This action updates a #${id} pendingGame`;
  }

  async remove(id: number) {
    try{
      const {affected}=await this.pendigGameRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO REMOVE GAME"
        });
      }
      return "perfectly deleted";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
