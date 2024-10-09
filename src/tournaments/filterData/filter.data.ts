import { Repository, SelectQueryBuilder } from "typeorm";
import { Tournament } from "../entities/tournament.entity";
import { manageError } from "src/common/errors/custom/manage.error";


export class FilterDataService{
    async returnResults(repo:Repository<Tournament>,querys:any){
        const builder= repo.createQueryBuilder("tournaments");
        return await this.FilterData(builder,querys);
    }

    private async FilterData(builder:SelectQueryBuilder<Tournament>,querys:any){
        builder.innerJoin("tournaments.player","players")
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
}