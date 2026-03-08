import { Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('seed')
  seedData() {
    return this.projectService.seed();
  }

  @Get('developers')
  getDevelopers() {
    return this.projectService.getDevelopers();
  }

  @Get('projects')
  getProjects() {
    return this.projectService.getProjects();
  }
}
