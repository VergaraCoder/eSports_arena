import { Injectable } from '@nestjs/common';
import { CreateTournamentPlayerDto } from './dto/create-tournament-player.dto';
import { UpdateTournamentPlayerDto } from './dto/update-tournament-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentPlayer } from './entities/tournament-player.entity';
import { Repository } from 'typeorm';
import { PlayersService } from 'src/players/players.service';
import { TournamentsService } from 'src/tournaments/tournaments.service';
import { FilterDataServiceTournamentPlayer } from './filterData/filter.data';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class TournamentPlayerService {

  constructor(
    @InjectRepository(TournamentPlayer)
    private tournamentPlayerRepository:Repository<TournamentPlayer>,
    private playerService:PlayersService,
    private tournamentService:TournamentsService,
    private filterDataTourPlayer:FilterDataServiceTournamentPlayer
  ){}

  async create(createPlayerTournament: any) {
    try{
        const idTournament=createPlayerTournament.tournamentId;
        const players=createPlayerTournament.players;
        const tournament=await this.tournamentService.findOne(idTournament);

        await this.filterDataTourPlayer.returnResults(this.tournamentPlayerRepository,players,"verify");

            
        for(const x of createPlayerTournament.players){
          const player=await this.playerService.findPlayerByNickName(x.nickName);
          const dataPlayer=this.tournamentPlayerRepository.create({playerId:player.id,tournamentId:tournament.id});
          await this.tournamentPlayerRepository.save(dataPlayer);
        }

        const add:number=tournament.currentNumberPlayers + players.length;
        await this.tournamentService.update(idTournament,{
          currentNumberPlayers:add
        });

        return "created correctly and update tournament"
    }catch(err:any){
      throw err;
    }
  }

  async findAll(tournamentId:number) {
    try{
      const dataPlayer=await this.tournamentPlayerRepository.findBy({tournamentId:tournamentId});
      if(dataPlayer.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE PLAYER IN THAT TOURNAMENT"
        });
      }
      return dataPlayer;
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} tournamentPlayer`;
  }

  async update(idTournament:number,idPlayer:number,newPlayerId:number) {
    try{
      const {affected} = await this.tournamentPlayerRepository.update({playerId:idPlayer,tournamentId:idTournament},{playerId:newPlayerId});

      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO UPDATE REGISTER"
        });
      }
      return "perfectly updated"
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  async removeByPlayerId(idPlayer: number) {
    try{
      const {affected} = await this.tournamentPlayerRepository.delete({playerId:idPlayer});

      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO DELETE BY PLAYER ID"
        });
      }
      return "perfectly deleted"
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }

  
  async removeByTournamentId(idTournament: number) {
    try{
      const {affected} = await this.tournamentPlayerRepository.delete({tournamentId:idTournament});
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO DELETE BY TOURNAMENT ID"
        });
      }
      return "perfectly deleted"
    }catch(err:any){
      throw manageError.signedError(err.message);
    }
  }
}
