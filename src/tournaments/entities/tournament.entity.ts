import { Champion } from "src/champions/entities/champion.entity";
import { PendingGame } from "src/pending_games/entities/pending_game.entity";
import { Position } from "src/positions/entities/position.entity";
import { ResultsGame } from "src/results-games/entities/results-game.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("tournaments")
export class Tournament {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nameTournament:string;

    @Column()
    maximunPlayers:number;

    @Column()
    currentNumberPlayers:number;

    @Column()
    endDate:Date;

    @Column()
    moneyEarned:number;

    @OneToMany(()=>ResultsGame,resultGame=>resultGame.tournament)
    resultGame:ResultsGame[];

    @OneToMany(()=>PendingGame,pendingGame=>pendingGame.tournament)
    pendingGame:PendingGame[];

    @OneToMany(()=>Champion,champion=>champion.tournament)
    champion:Champion[];

    @OneToMany(()=>Position,position=>position.tournament)
    position:Position[];
}
