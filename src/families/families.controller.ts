import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiQuery,
} from '@nestjs/swagger';

import { FamiliesService } from './families.service';

@ApiTags('Family')
@Controller('families')
export class FamiliesController {
    constructor(
        private readonly familyService: FamiliesService,
    ) { }

    @Get()
    @ApiQuery({ name: 'q', description: 'keyword' })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autocomplete families', })
    @ApiOkResponse({})
    async getOneFamilies(@Query('q') q: string,) {
        return await this.familyService.getFamilies(q);
    }

}
