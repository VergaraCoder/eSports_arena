import { Champion } from "src/champions/entities/champion.entity";
import { PendingGame } from "src/pending_games/entities/pending_game.entity";
import { Position } from "src/positions/entities/position.entity";
import { ResultsGame } from "src/results-games/entities/results-game.entity";
import { TournamentPlayer } from "src/tournament-player/entities/tournament-player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("players")
export class Player {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nickName:string;

    @Column()
    age:number;

    @OneToMany(()=>TournamentPlayer,tournamentPlayer=>tournamentPlayer.player)
    tournamentPlayer:TournamentPlayer[];

    @OneToMany(()=>PendingGame,pendingGame=>pendingGame.player1)
    pendingGame1:PendingGame[];

    @OneToMany(()=>PendingGame,pendingGame=>pendingGame.player2)
    pendingGame2:PendingGame[];

    @OneToMany(()=>Position,position=>position.player)
    position:Position[];

    @OneToMany(()=>ResultsGame,resultGame=>resultGame.player)
    resultGame:ResultsGame[];

    @OneToMany(()=>Champion,champion=>champion.player)
    champion:Champion[];

}
