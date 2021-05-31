import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository
    ) {}

    async get(id: number): Promise<UserDto> {
        if (!id) {
            throw new BadRequestException('Id must be sent.');
        }

        const user: User = await this._userRepository.findOne(id, {
            where: { status: 'ACTIVE' },
        });

        return user;
    }
}
