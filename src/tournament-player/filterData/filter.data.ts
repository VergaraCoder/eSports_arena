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
        
        console.log(nicks);
        
        const data=await builder
        .innerJoin("tournamentPlayer.player","players")
        .where("players.nickName IN (:...nick)",{nick:nicks})
        .andWhere("tournamentPlayer.playerId=players.id")
        .getMany();
        try{            
            console.log("data is ");
            console.log(data);
            
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

    async verifyTournament(tournament:any,players:any){
        try{
            
            const numPlayers=players.length;

            const currentnumberPlayers=tournament.currentNumberPlayers;

            const maximPlayer=tournament.maximunPlayers;

            const totalWithAdition=currentnumberPlayers+numPlayers;

            const verification= maximPlayer-currentnumberPlayers;

            const operation= maximPlayer-totalWithAdition;


            if(verification==0){
                throw new manageError({
                     type:"BAD_REQUEST",
                    message:`YOU CANNOT ENTER MORE PLAYERS BECAUSE THE SPOTS ARE ALREADY FULL.`
                });
            }
            if(operation<0){
                throw new manageError({
                    type:"BAD_REQUEST",
                    message:`THE TOTAL NUMBER OF PLAYERS IN THE TOURNAMENT ${tournament.nameTournament} WAS EXCEEDED BY ${Math.abs(operation)} PLAYERS THEREFORE REDUCES THE NUMBER.`
                });
            }
            return true;
        }catch(err:any){
            throw manageError.signedError(err.message);
        }
    }
}