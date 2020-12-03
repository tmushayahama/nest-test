import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('find')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
  ) { }


}
