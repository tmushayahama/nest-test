import { Module } from '@nestjs/common';
import { ConfigModule } from './../config/config.module';
import { FamiliesController } from './families.controller';
import { FamiliesService } from './families.service';


@Module({
  imports: [ConfigModule],
  controllers: [FamiliesController],
  providers: [FamiliesService]
})
export class FamiliesModule { }
