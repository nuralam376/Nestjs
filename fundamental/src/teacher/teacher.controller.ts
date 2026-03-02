import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Teacher } from './teacher.schema';

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async addTeacher(@Body() body: Partial<Teacher>): Promise<Teacher> {
    return this.teacherService.createTeacher(body);
  }

  @Get()
  async getAllTeachers(): Promise<Teacher[]> {
    return this.teacherService.getAllTeachers();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<Teacher | null> {
    return this.teacherService.getTeacherById(id);
  }

  @Put(':id')
  async updateTeacher(
    @Param('id') id: string,
    @Body() data: Partial<Teacher>,
  ): Promise<Teacher | null> {
    return this.teacherService.updateTeacher(id, data);
  }

  @Patch(':id')
  async patchTeacher(
    @Param('id') id: string,
    @Body() data: Partial<Teacher>,
  ): Promise<Teacher | null> {
    return this.teacherService.patchTeacher(id, data);
  }

  @Delete(':id')
  async deleteTeacher(@Param('id') id: string): Promise<Teacher | null> {
    return this.teacherService.deleteTeacher(id);
  }
}
