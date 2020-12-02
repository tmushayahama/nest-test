import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiParam,
} from '@nestjs/swagger';

import { TermsService } from './terms.service';

@ApiTags('Term')
@Controller('term')
export class TermsController {
    constructor(
        private readonly termService: TermsService,
    ) { }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get One term', })
    @ApiParam({ name: 'id', description: 'id of term' })
    @ApiOkResponse({})
    async getOneTerms(@Param() params) {
        return await this.termService.getTerms(params.id);
    }

}
