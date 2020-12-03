import { Module } from '@nestjs/common';
import { ConfigModule } from './../config/config.module';
import { TermsController } from './terms.controller';
import { TermsService } from './terms.service';


@Module({
  imports: [
    ConfigModule],
  controllers: [TermsController],
  providers: [TermsService]
})
export class TermsModule { }

