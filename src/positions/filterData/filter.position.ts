import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Position } from "../entities/position.entity";
import { Repository } from "typeorm";
import { PositionsService } from "../positions.service";

@Injectable()
export class FilterDataPositionService{
    constructor(
        @InjectRepository(Position)
        private positionRepository:Repository<Position>,
        private positionService:PositionsService
    ){}
    
    async filterCreationOfPositions(dataPlayers:any){

        console.log(dataPlayers);
        let object={};
        const keys= Object.keys(dataPlayers);

        for(const player of keys){

            const query=await this.positionService.findOneByPlayerId(dataPlayers[player]);

            if(player=="winner"){
                console.log("trhe query is");
                query["winner"]=true;
                query["tournamentId"]=dataPlayers.tournamentId;
                query["playerId"]=dataPlayers[player] ;

                
                await this.chooseBetweenCreationOrUpdate(query);
            } 
            else if(player=="lossed"){
                query["lossed"]=true;
                query["tournamentId"]=dataPlayers.tournamentId;
                query["playerId"]=dataPlayers[player] ;

                await this.chooseBetweenCreationOrUpdate(query);
            }
        }
    }
    private async chooseBetweenCreationOrUpdate(data:any){
        console.log("entramos a verificar");
        console.log(data);
        

        if(!data.id && data.winner ){
            delete data["winner"];
            data.score=3;
            console.log(data);
            
            return await this.positionService.create(data);
        }

        if(data.id && data.winner){
            delete data["winner"];
            data.score += 3;
            return await this.positionService.update(data.id,data);
        }

          
        if(!data.id && data.lossed){
            delete data["lossed"];
            data.score = -3;
            return await this.positionService.create(data);
        }

          
        if(data.id && data.lossed){
            delete data["lossed"];
            data.score -= 3;
            return await this.positionService.update(data.id,data);
        }
    }
  
}