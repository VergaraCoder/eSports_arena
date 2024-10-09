import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: any) {
    try {
      const verify = await this.findPlayerByNickName(
        createPlayerDto.nickName,
        true,
      );

      if (verify && verify.nickName == createPlayerDto.nickName) {
        throw new manageError({
          type: 'CONFLICT',
          message: 'THIS NICKNAME ALREADY EXIST',
        });
      }
      const dataPlayer = this.playerRepository.create(createPlayerDto);
      await this.playerRepository.save(dataPlayer);
      return dataPlayer;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async filterToAddPlayers(data: any) {
    try {
      let idsPlayers = [];
      for (const onePlayer of data) {
        const querys = await this.findPlayerByNickName(
          onePlayer.nickName,
          true,
        );
        if (querys) {
          throw new manageError({
            type: 'CONFLICT',
            message: `THE NICKNAME ${querys.nickName} ALRREADY IN THIS TOURNAMENT`,
          });
        }
        idsPlayers.push();
      }
    } catch (err: any) {}
  }

  async findAll() {
    return `This action returns all players`;
  }

  async findPlayerByNickName(nickName: string, verify?: boolean) {
    try {
      console.log('the nick is');

      console.log(nickName);

      const dataPlayer = await this.playerRepository.findOne({
        where: { nickName: nickName },
      });
      if (!dataPlayer && !verify) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'THAT PLAYER NOT EXIST WITH THIS NICKNAME',
        });
      }
      return dataPlayer;
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: number) {
    try {
      //const
    } catch (err: any) {}
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    try {
      const { affected } = await this.playerRepository.update(
        id,
        updatePlayerDto,
      );
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO UPDATE USER',
        });
      }
      return 'Delete perfectly';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.playerRepository.delete(id);
      if (affected == 0) {
        throw new manageError({
          type: 'NOT_FOUND',
          message: 'FAILED TO DELETE USER',
        });
      }
      return 'Delete perfectly';
    } catch (err: any) {
      throw manageError.signedError(err.message);
    }
  }
}
