import { PlayersService } from "src/players/players.service";
import { PendingGamesService } from "src/pending_games/pending_games.service";
import { TournamentsService } from "src/tournaments/tournaments.service";
import { TournamentPlayerService } from "src/tournament-player/tournament-player.service";
import { manageError } from "src/common/errors/custom/manage.error";
import { Injectable } from "@nestjs/common";
import { PositionsService } from "src/positions/positions.service";

@Injectable()
export class validateDataFilterResultGame{
    constructor(
        private tournamentPlayers:TournamentPlayerService,
        private gameService:PendingGamesService,
    ){}

    async filterDataToCreateResult(data:any){
        try{          
            const idsPlayers=await this.filterPlayers(data.players,data.tournamentId);
            const dataGame=await this.filterGame(data.gameId);
            await this.verifyPlayerWithGame(dataGame,idsPlayers);
        }catch(err:any){
            throw err;
        }
    }

    private async filterPlayers(playersIds:number[],idTournament:number){
        try{           
            let playersId:number[]=[];
            for(const id of playersIds){
                const data=await this.tournamentPlayers.findOneByPlayerId(id,idTournament);
                playersId.push(data.playerId);
            }
            return playersId;
        }catch(err:any){
            throw err;
        }
    }

    private async filterGame(idPendingGame:number){
        try{           
            const dataGame=await this.gameService.findOne(idPendingGame);
            return dataGame;
        }catch(err:any){
            throw err;
        }
    }

    private async verifyPlayerWithGame(gameData:any,players:number[]){
        try{     
            const idPlayers=[gameData.player1Id,gameData.player2Id];
        
            if(!idPlayers.includes(players[0]) && !idPlayers.includes(players[1])){
                throw new manageError({
                    type:"CONFLICT",
                    message:"PLAYERS DO NOT BELONG TO THIS GAME."
                });
            }
            return true;
        }catch(err:any){
            throw manageError.signedError(err.message);
        }
    }
}