import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiOperation,
    ApiQuery,
} from '@nestjs/swagger';

import { CategoriesService } from './categories.service';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoryService: CategoriesService,
    ) { }

    @Get()
    @ApiQuery({ name: 'q', description: 'keyword' })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Autocomplete categories', })
    @ApiOkResponse({})
    async getOneCategories(@Query('q') q: string, @Query('count') count: boolean) {
        return await this.categoryService.getCategories(q, count);
    }

}
