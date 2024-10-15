import { Injectable } from "@nestjs/common";
import { PositionsService } from "src/positions/positions.service";


@Injectable()
export class FilterDataServiceChampion{
    constructor(
        private positionService:PositionsService
    ){}

    async returnTheHihgtsScore(idTournament:number){
        try{          
            const register=await this.positionService.findAllByTournamentId(idTournament);
            const big=this.extractTheBig(register);
            return big;
            
        }catch(err:any){
            throw err;
        }
    }

    private extractTheBig(data:any){
        let resource;
        let scoreBig=0;
        for(const x of data){
            if(x.score > scoreBig){
                resource="";
                resource=x;
            }
        }
        return resource;
    }
}