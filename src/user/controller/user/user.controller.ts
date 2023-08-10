import {
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserStatusValidationPipe } from 'src/user/pipe/user-status-validation.pipe';
import { UserService } from 'src/user/service/user/user.service';
import { UserStatus } from 'src/user/user-status/user-status.enum';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: UserDto): Promise<UserEntity> {
    return this.userService.createUser(user);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.findAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Delete('/:id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUserById(id);
  }

  @Patch('/:id/status')
  updateUserStatus(
    @Param('id') id: string,
    @Body('status', UserStatusValidationPipe) status: UserStatus,
  ): Promise<UserEntity> {
    return this.userService.updateUserStatus(id, status);
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.userService.updateUserData(id, updateUserDto);
  }
}
