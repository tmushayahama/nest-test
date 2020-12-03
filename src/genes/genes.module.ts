import { Module } from '@nestjs/common';
import { ConfigModule } from './../config/config.module';
import { GenesController } from './genes.controller';
import { GenesService } from './genes.service';


@Module({
  imports: [ConfigModule],
  controllers: [GenesController],
  providers: [GenesService]
})
export class GenesModule { }
