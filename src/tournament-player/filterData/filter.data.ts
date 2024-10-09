import { Repository, SelectQueryBuilder } from "typeorm";
import { Tournament } from "../../tournaments/entities/tournament.entity";
import { manageError } from "src/common/errors/custom/manage.error";
import { TournamentPlayer } from "../entities/tournament-player.entity";


export class FilterDataServiceTournamentPlayer{
    async returnResults(repo:Repository<TournamentPlayer>,querys:any,operation:string){
        const builder= repo.createQueryBuilder("tournamentPlayer");
        switch(operation){
            case "all":
                return await this.FilterData(builder,querys);
            case "verify":
                return await this.FilterDataRegister(builder,querys);
        }
    }

    private async FilterData(builder:SelectQueryBuilder<TournamentPlayer>,querys:any){
        builder.innerJoin("tournamentPlayer.player","players")
               .andWhere("tournaments.id=:tournament",{tournament:querys.tournamentId})

        try{
            const data=await builder.getMany();
            if(data.length==0){
                throw new manageError({
                    type:"NOT_FOUND",
                    message:"DOES THERE ARE NOT REGISTER OF THAT TOURNAMENT"
                });
            }
                   
        }catch(err:any){
            throw manageError.signedError(err.message);
        }
    }


    private async FilterDataRegister(builder:SelectQueryBuilder<TournamentPlayer>,nickNames:any){
        console.log("enter to verify");
        let nicks=nickNames.map(item=>item.nickName);
        
        const data=await builder
        .innerJoin("tournamentPlayer.player","players")
        .where("players.nickName IN (:...nick)",{nick:nicks})
        .andWhere("tournamentPlayer.playerId=players.id")
        .getMany();
        try{            
            if(data.length !== 0 ){
                throw new manageError({
                    type:"CONFLICT",
                    message:"SOME NICKNAME ALREADY EXIST IN THIS TOURNAMENTE"
                });
            }
            return true;
        }catch(err:any){
            throw manageError.signedError(err.message);
        }
    }
}