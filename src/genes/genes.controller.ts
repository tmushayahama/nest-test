import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiQuery,
} from '@nestjs/swagger';

import { GenesService } from './genes.service';

@ApiTags('Gene')
@Controller('genes')
export class GenesController {
    constructor(
        private readonly geneService: GenesService,
    ) { }

    @Get()
    @ApiQuery({ name: 'q', description: 'keyword' })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autocomplete genes', })
    @ApiOkResponse({})
    async getOneGenes(@Query('q') q: string, @Query('count') count: boolean) {
        return await this.geneService.getGenes(q, count);
    }
}
