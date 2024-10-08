import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { seederUser } from './common/database/seeders/seeder.user';
import { seederRole } from './common/database/seeders/seeder.role';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource=app.get(DataSource);
  const roleSeed=new seederRole()

  await roleSeed.run(dataSource);

  const userSeed=new seederUser();
  await userSeed.run(dataSource);

  await app.listen(3000);
}
bootstrap();
