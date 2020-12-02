import { Controller, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiParam,
} from '@nestjs/swagger';

import { GenesService } from './genes.service';

@ApiTags('Gene')
@Controller('genes')
export class GenesController {
    constructor(
        private readonly geneService: GenesService,
    ) { }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get One gene', })
    @ApiParam({ name: 'id', description: 'id of gene' })
    @ApiOkResponse({})
    async getOneGenes(@Param() params) {
        return await this.geneService.getGenes(params.id);
    }

}
