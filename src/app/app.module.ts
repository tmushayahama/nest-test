import * as winston from 'winston';
import * as rotateFile from 'winston-daily-rotate-file';
import { CommandModule } from 'nestjs-command';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { WinstonModule } from '../winston/winston.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { SearchModule } from './../search/search.module';
import { GenesModule } from './../genes/genes.module';
import { TermsModule } from './../terms/terms.module';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.isEnv('dev')
          ? {
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
              new winston.transports.Console({
                format: winston.format.simple(),
              }),
            ],
          }
          : {
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
              new winston.transports.File({
                filename: 'logs/error.log',
                level: 'error',
              }),
              new winston.transports.Console({
                format: winston.format.simple(),
              }),
              new rotateFile({
                filename: 'logs/application-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
              }),
            ],
          };
      },
    }),
    AccessControlModule.forRoles(roles),
    CommandModule,
    ConfigModule,
    GenesModule,
    TermsModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
