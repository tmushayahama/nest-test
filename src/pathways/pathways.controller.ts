import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiQuery,
} from '@nestjs/swagger';

import { PathwaysService } from './pathways.service';

@ApiTags('Pathway')
@Controller('pathways')
export class PathwaysController {
    constructor(
        private readonly pathwayService: PathwaysService,
    ) { }

    @Get()
    @ApiQuery({ name: 'q', description: 'keyword' })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autocomplete pathways', })
    @ApiOkResponse({})
    async getOnePathways(@Query('q') q: string, @Query('count') count: boolean) {
        return await this.pathwayService.getPathways(q, count);
    }

}
