import { Controller, Get, Param, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';

import { TermsService } from './terms.service';

@ApiTags('Term')
@Controller('terms')
export class TermsController {
    constructor(
        private readonly termService: TermsService,
    ) { }


    @Get()
    @ApiQuery({ name: 'q', description: 'keyword' })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autocomplete terms', })
    @ApiOkResponse({})
    async getOneTerms(@Query('q') q: string,) {
        return await this.termService.getTerms(q);
    }


}
