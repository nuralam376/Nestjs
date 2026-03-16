import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Employees } from './employees.entity';
import { EmployeesService } from './employees.service';
import { SupabaseAuthGuard } from 'src/common/guards/supabase-auth/supabase-auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() employeesData: Partial<Employees>): Promise<Employees> {
    return this.employeesService.create(employeesData);
  }

  @UseGuards(SupabaseAuthGuard)
  @Get()
  async getAllEmployees(): Promise<Employees[]> {
    return this.employeesService.findAll();
  }

  @Get('search')
  async searchEmployees(
    @Query('name') name?: string,
    @Query('department') department?: string,
  ): Promise<Employees[]> {
    return this.employeesService.search({ name, department });
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: number): Promise<Employees> {
    return this.employeesService.findOne(id);
  }

  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() updatedData: Partial<Employees>,
  ): Promise<Employees> {
    return this.employeesService.update(id, updatedData);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> {
    return this.employeesService.delete(id);
  }
}
