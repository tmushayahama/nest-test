import { Module } from '@nestjs/common';
import { GenesController } from './genes.controller';
import { GenesService } from './genes.service';


@Module({
  imports: [],
  controllers: [GenesController],
  providers: [GenesService]
})
export class GenesModule { }
