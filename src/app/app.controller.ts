import { Controller, Delete, Get, Param, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiResponse, ApiOperation, ApiParam, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

/**
 * App Controller
 */
@Controller()
@ApiBearerAuth()
export class AppController {
  /**
   * Constructor
   * @param appService
   * @param profileService
   */
  constructor(private readonly appService: AppService) { }

  @Get('config')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Config' })
  @ApiOkResponse({})
  async getConfig() {
    return await this.appService.getConfig()
  }

  /**
   * Returns the an environment variable from config file
   * @returns {string} the application environment url
   */
  @Get()
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  getString(): string {
    return this.appService.root();
  }

  /**
   * Fetches request metadata
   * @param {Req} req the request body
   * @returns {Partial<Request>} the request user populated from the passport module
   */
  @Get('request/user')
  @ApiResponse({ status: 200, description: 'Request Received' })
  @ApiResponse({ status: 400, description: 'Request Failed' })
  getProfile(@Req() req): Partial<Request> {
    return req.user;
  }
}
