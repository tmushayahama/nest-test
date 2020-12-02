import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('find')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
  ) { }

  @Post('bulkInsert')
  async bulkInsert(@Body() documents: any[]) {
    return await this.searchService.bulkInsert(documents);
  }

  @Get('cards')
  async searchCards(@Query('q') q: string) {
    const results = await this.searchService.searchIndex('cards', q);
    return results;
  }

  @Get('locations')
  async searchLocations(@Query('q') q: string) {
    const results = await this.searchService.searchLocation(q);
    return results;
  }

}
