import { Player } from "src/players/entities/player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("champions")
export class Champion {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    playerId:number;

    @Column()
    tournamentId:number;

    @ManyToOne(()=>Player,player=>player.champion)
    player:Player;

    @ManyToOne(()=>Tournament,tournament=>tournament.champion)
    tournament:Tournament;
}
