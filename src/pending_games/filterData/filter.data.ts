import { Injectable } from "@nestjs/common";
import { manageError } from "src/common/errors/custom/manage.error";
import { PositionsService } from "src/positions/positions.service";
import { TournamentsService } from "src/tournaments/tournaments.service";


@Injectable()
export class filterDataServiceGames{
    constructor(
        private tournamentService:TournamentsService,
        private positionService:PositionsService

    ){}

    async verifyTotalPlayer(idTournament:number){
        try{
            const dataTournament=await this.tournamentService.findOne(idTournament);
            
            const verificaction=dataTournament.currentNumberPlayers - dataTournament.maximunPlayers;

            if(verificaction!==0){
                throw new manageError({
                    type:"BAD_REQUEST",
                    message:"TO CREATE THE GAMES YOU MUST FILL ALL THE SPOTS FIRST."
                });
            }
            return true;
        }catch(err:any){
            throw manageError.signedError(err.message);
        }
    }



    async validateScore(idTournament:number){
        try{
            const rivals=await this.positionService.findOneByScore(idTournament,3);
            return rivals;
        }catch(err:any){
            throw err;
        }
    }
}