import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './../../entity/user.entity';
import { UserStatus } from 'src/user/user-status/user-status.enum';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDto: UserDto): Promise<UserEntity> {
    const { firstName, lastName, email, phoneNumber } = createUserDto;
    const user = new UserEntity();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.status = UserStatus.ACTIVE;
    return this.userRepository.save(user);
  }

  findAllUsers(): Promise<UserDto[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserEntity> {
    const found = await this.userRepository.findOne(id);
    if (!found) {
      throw new NotFoundException('User not found!');
    }
    return found;
  }

  async deleteUserById(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User Not Found!');
    }
  }

  async updateUserStatus(id: number, status: UserStatus): Promise<UserEntity> {
    const userData = await this.getUserById(id);
    userData.status = status;
    await this.userRepository.save(userData);

    return userData;
  }

  async updateUserData(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    const {firstName, lastName, email, phoneNumber} = updateUserDto;
    const userData = await this.getUserById(id);
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.email = email;
    userData.phoneNumber = phoneNumber;
    await this.userRepository.save(userData);

    return userData;
  }
}
