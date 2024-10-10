import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateResultsGameDto {

    @IsNotEmpty()
    @IsNumber()
    winner:number;

    @IsNotEmpty()
    @IsNumber()
    lossed:number;

    @IsNotEmpty()
    @IsNumber()
    tournamentId:number;

    @IsNotEmpty()
    @IsNumber()
    gameId:number;
}
