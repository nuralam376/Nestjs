import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/guards/roles/roles.decorator';
import { Role } from 'src/common/guards/roles/roles.enum';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller('user-roles')
export class UserRolesController {
  @Get('admin-data')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  getAdminData() {
    return { message: 'Only Admin can access this data' };
  }

  @Get('user-data')
  getUserData() {
    return { message: 'Anyone can access this data' };
  }
}
