import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { manageError } from 'src/common/errors/custom/manage.error';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository:Repository<User>,
    private roleService:RolesService
  ){}

  async create(createUserDto: any) {
    try{
      const roleUser=await this.roleService.findOneByName(createUserDto.role);
      //DELETE PROPERTIE
      const dataUser=await this.userRepository.create(createUserDto);
      await this.userRepository.save(dataUser);
      return dataUser;
    }catch(err:any){
      throw err;
    } 
  }

  async findAll() {
    try{
      const users=await this.userRepository.find();
      if(users.length==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"DOES THERE ARE NOT USERS."
        });
      }
      return users;
    }catch(err:any) {
      throw manageError.signedError(err.message);
    }
  }

  async findOne(id: string) {
    try{
      const user=await this.userRepository.findOne({where:{id:id}});
      if(!user){
        throw new manageError({
          type:"NOT_FOUND",
          message:"USER NOT FOUND."
        });
      }
      return user;
    }catch(err:any) {
      throw manageError.signedError(err.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try{
      const {affected}=await this.userRepository.update(id,updateUserDto);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO UPDATE USER."
        });
      }
      return "Perfectly updated";
    }catch(err:any) {
      throw manageError.signedError(err.message);
    }
  }

  async remove(id: string) {
    try{
      const {affected}=await this.userRepository.delete(id);
      if(affected==0){
        throw new manageError({
          type:"NOT_FOUND",
          message:"FAILTED TO DELETED USER."
        });
      }
      return "Perfectly deleted";
    }catch(err:any) {
      throw manageError.signedError(err.message);
    }
  }
}
