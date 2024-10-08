import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { Role } from "src/roles/entities/role.entity";


export class seederRole implements Seeder{
    async run(dataSource: DataSource): Promise<any> {
        const repo=dataSource.getRepository(Role);
        const data=[
            {nameRole:"admin"},
            {nameRole:"client"}
        ];

        for(const x of data){
            const query=await repo.findOneBy({nameRole:x.nameRole});
            if(!query){
                const dataRole=repo.create(x);
                await repo.save(dataRole);
            }
        }
    }
}