import { Module } from '@nestjs/common';
import { ConfigModule } from './../config/config.module';
import { PathwaysController } from './pathways.controller';
import { PathwaysService } from './pathways.service';


@Module({
  imports: [ConfigModule],
  controllers: [PathwaysController],
  providers: [PathwaysService]
})
export class PathwaysModule { }
