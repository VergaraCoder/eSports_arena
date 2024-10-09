import { Champion } from "src/champions/entities/champion.entity";
import { PendingGame } from "src/pending_games/entities/pending_game.entity";
import { Player } from "src/players/entities/player.entity";
import { Position } from "src/positions/entities/position.entity";
import { ResultsGame } from "src/results-games/entities/results-game.entity";
import { TournamentPlayer } from "src/tournament-player/entities/tournament-player.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(()=>TournamentPlayer,tournamentPlayer=>tournamentPlayer.tournament)
    tournamentPlayer:TournamentPlayer[];

    @OneToMany(()=>ResultsGame,resultGame=>resultGame.tournament)
    resultGame:ResultsGame[];

    @OneToMany(()=>PendingGame,pendingGame=>pendingGame.tournament)
    pendingGame:PendingGame[];

    @OneToMany(()=>Champion,champion=>champion.tournament)
    champion:Champion[];

    @OneToMany(()=>Position,position=>position.tournament)
    position:Position[];
}
