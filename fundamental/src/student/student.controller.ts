import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  getStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getStudentById(id);
  }

  @Post()
  createStudent(@Body() body: { name: string; age: number }) {
    return this.studentService.createStudent(body);
  }

  @Put(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { name: string; age: number },
  ) {
    return this.studentService.updateStudent(id, body);
  }

  @Patch(':id')
  patchStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<{ name: string; age: number }>,
  ) {
    return this.studentService.patchStudent(id, body);
  }

  @Delete(':id')
  deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
