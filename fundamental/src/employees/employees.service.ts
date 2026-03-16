import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from './employees.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
  ) {}

  async create(employeeData: Partial<Employees>): Promise<Employees> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employees[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employees> {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} was not found`);
    }
    return employee;
  }

  async update(id: number, updatedData: Partial<Employees>): Promise<Employees> {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} was not found`);
    }

    const updatedEmployee = Object.assign(employee, updatedData);
    return this.employeeRepository.save(updatedEmployee);
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.employeeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} was not found`);
    }

    return { message: `Employee with ID ${id} has been deleted successfully` };
  }

  async search(filters: { name?: string; department?: string }): Promise<Employees[]> {
    const query = this.employeeRepository.createQueryBuilder('employees');

    if (filters.name) {
      query.andWhere('employees.name ILike :name', { name: `%${filters.name}%` });
    }

    if (filters.department) {
      query.andWhere('employees.department =  :dept', { dept: filters.department });
    }

    return query.getMany();
  }
}
