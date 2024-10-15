import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { Position } from "../entities/position.entity";

@Injectable()
export class QuerysBuilder {
    async returnResults(repo:Repository<Position>,operation:string,querys:any){
        const queryBuilder=repo.createQueryBuilder("positions");
        switch(operation){
            case "all":
                return await this.SelectPositionTheHigthesScore(queryBuilder,querys);
        }
    }

    private async SelectPositionTheHigthesScore(builder:SelectQueryBuilder<Position>,querys:any){
        
        const sqlQuerys=await builder
        .select("MAX(positions.score) AS MaxScore")
        .innerJoinAndSelect("positions.player","players")
        .where("players.id = positions.playerId")
        .andWhere("positions.tournamentId=:id",{id:querys.idTournament})
        .groupBy("positions.playerId,players.nickName")
        .getRawOne();

        return sqlQuerys;
    }
}