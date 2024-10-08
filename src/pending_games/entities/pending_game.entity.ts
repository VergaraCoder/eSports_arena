import { Player } from "src/players/entities/player.entity";
import { ResultsGame } from "src/results-games/entities/results-game.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("pendingGames")
export class PendingGame {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    player1Id:number;

    @Column()
    player2Id:number;

    @Column()
    tournamentId:number;

    @Column()
    date:Date;

    @ManyToOne(()=>Player,player1=>player1.pendingGame1)
    player1:Player;

    @ManyToOne(()=>Player,player2=>player2.pendingGame2)
    player2:Player;

    @ManyToOne(()=>Tournament,tournament=>tournament.pendingGame)
    tournament:Tournament;

    @OneToMany(()=>ResultsGame,resultGame=>resultGame.pendingGame)
    resultGame:ResultsGame[];
}
