import { Module } from '@nestjs/common';
import { ConfigModule } from './../config/config.module';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';


@Module({
  imports: [ConfigModule],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule { }
