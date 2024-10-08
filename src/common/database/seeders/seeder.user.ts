import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import * as bcrypt from 'bcrypt';


export class seederUser implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repo=dataSource.getRepository(User);
        const data=[
            {
                name:"jesus",
                email:"jesus@gmail.com",
                password:"jesus12",
                roleId:1
            },
            {
                name:"pedro",
                email:"pedro@gmail.com",
                password:"pedro12",
                roleId:2
            }
        ];

        for(const x of data){
            const query=await repo.findOneBy({email:x.email});
            if(!query){
                const hassPass=await bcrypt.hash(x.password,10);
                const dataUser=repo.create({
                    ...x,password:hassPass
                });
                await repo.save(dataUser);
            }
        }
    }
}