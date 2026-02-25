import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception/http-exception.filter';

@Controller('exception')
export class ExceptionController {
  @Get('error/:id')
  @UseFilters(HttpExceptionFilter)
  getError(@Param('id', ParseIntPipe) id: number) {
    return { message: `Id is ${id}` };
  }
}
