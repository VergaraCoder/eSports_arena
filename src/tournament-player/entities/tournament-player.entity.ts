import { Player } from "src/players/entities/player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("tournamentPlayer")
export class TournamentPlayer {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    playerId:number;

    @Column()
    tournamentId:number;

    @ManyToOne(()=>Player,player=>player.tournamentPlayer,{eager:true})
    player:Player;

    @ManyToOne(()=>Tournament,tournament=>tournament.tournamentPlayer,{eager:true})
    tournament:Tournament;
}
