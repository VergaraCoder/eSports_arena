import { Injectable } from '@nestjs/common';
import { CreateChampionDto } from './dto/create-champion.dto';
import { UpdateChampionDto } from './dto/update-champion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Champion } from './entities/champion.entity';
import { Repository } from 'typeorm';
import { FilterDataServiceChampion } from './filterData/filterData';

@Injectable()
export class ChampionsService {

  constructor(
    @InjectRepository(Champion)
    private championRepository:Repository<Champion>,
    private filterData:FilterDataServiceChampion
  ){}

  async create(createChampion: any) {
    try{
      const theMostBig=await this.filterData.returnTheHihgtsScore(createChampion.idTournament);

      const dataCreated=this.championRepository.create({
        playerId:theMostBig.playerId,
        tournamentId:theMostBig.tournamentId
      });
      await this.championRepository.save(dataCreated);
      return dataCreated;
    }catch(err:any){
      throw err;
    }
  }

  findAll() {
    return `This action returns all champions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} champion`;
  }

  update(id: number, updateChampionDto: UpdateChampionDto) {
    return `This action updates a #${id} champion`;
  }

  remove(id: number) {
    return `This action removes a #${id} champion`;
  }
}
