import { Injectable } from '@nestjs/common';
import { CreateResultsGameDto } from './dto/create-results-game.dto';
import { UpdateResultsGameDto } from './dto/update-results-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResultsGame } from './entities/results-game.entity';
import { Repository } from 'typeorm';
import { PendingGamesService } from 'src/pending_games/pending_games.service';
import { manageError } from 'src/common/errors/custom/manage.error';
import { validateDataFilterResultGame } from './filterData/filter.data';

@Injectable()
export class ResultsGamesService {

  constructor(
    @InjectRepository(ResultsGame)
    private resultRepository:Repository<ResultsGame>,
    private gameService:PendingGamesService,
    private filterData:validateDataFilterResultGame
  ){}

  async create(createResultsGameDto: any) {
    try{
      const idGame=createResultsGameDto.gameId;
      const playerWiiner= createResultsGameDto.winner;
      const playerLossed= createResultsGameDto.lossed;
      const tournamentId=createResultsGameDto.tournamentId;

      await this.filterData.filterDataToCreateResult({
        players:[playerWiiner, playerLossed],
        tournamentId:tournamentId,
        gameId:idGame
      });

      const game=await this.gameService.findOne(idGame);
      const dataResult=this.resultRepository.create({
        playerWinnerId:playerWiiner,
        losingPlayerId:playerLossed,
        tournamentId:tournamentId,
        gameId:game.id
      });

      await this.resultRepository.save(dataResult);
      return dataResult;

    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findAll() {
    try{
      const results=await this.resultRepository.find();
      if(results.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE REGISTER YET"
        });
      }
      return results;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try{
      const result=await this.resultRepository.findOneBy({id:id});
      if(!result){
        throw new manageError({
          type:"NOT_FOUND",
          message:"THIS REGISTER OF RESULT NOT EXIST"
        });
      } 
      return result;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async update(id: number, updateResultsGameDto: UpdateResultsGameDto) {
    try{
      const {affected} =await this.resultRepository.update(id,updateResultsGameDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILED TO UPDATE RESULT GAME"
        });
      }
      return "Perfectly updated";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try{
      const {affected}= await this.resultRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO DELETE RESULT."
        });
      }
      return "Perfectly deleted";
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
