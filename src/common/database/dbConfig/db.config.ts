import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Champion } from "src/champions/entities/champion.entity";
import { PendingGame } from "src/pending_games/entities/pending_game.entity";
import { Player } from "src/players/entities/player.entity";
import { Position } from "src/positions/entities/position.entity";
import { ResultsGame } from "src/results-games/entities/results-game.entity";
import { Role } from "src/roles/entities/role.entity";
import { Tournament } from "src/tournaments/entities/tournament.entity";
import { User } from "src/users/entities/user.entity";


@Injectable()
export class credentialsDb implements TypeOrmOptionsFactory{
    constructor(
        private configService:ConfigService
    ){}
    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: +this.configService.get<string>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_DATABASE'),
            entities: [User,Role,Player,PendingGame,ResultsGame,Champion,Position,Tournament],
            synchronize: true,
        }
    }
}