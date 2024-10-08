import { Player } from "src/players/entities/player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("positions")
export class Position {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    tournamentId:number;

    @Column()
    playerId:number;

    @Column()
    score:number;

    @ManyToOne(()=>Tournament,tournament=>tournament)
    tournament:Tournament;

    @ManyToOne(()=>Player,player=>player)
    player:Player;
}
