import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.schema';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async addTeacher(@Body() body: Partial<Teacher>) {
    return this.teacherService.createTeacher(body);
  }

  @Get()
  async getAllTeachers() {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string) {
    return this.teacherService.getTeacherById(id);
  }
}
