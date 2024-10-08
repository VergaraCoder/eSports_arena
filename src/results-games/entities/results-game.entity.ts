import { PendingGame } from "src/pending_games/entities/pending_game.entity";
import { Player } from "src/players/entities/player.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("resultGame")
export class ResultsGame {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    playerWinnerId:number;

    @Column()
    losingPlayerId:number;

    @Column()
    tournamentId:number;

    @Column()
    gameId:number;

    @ManyToOne(()=>PendingGame,pendingGame=>pendingGame.resultGame)
    pendingGame:PendingGame;

    @ManyToOne(()=>Tournament,tournament=>tournament.resultGame)
    tournament:Tournament;

    @ManyToOne(()=>Player,player=>player.resultGame)
    player:Player;
}
