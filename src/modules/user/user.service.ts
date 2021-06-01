import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '../../shared/status.enum';
import { getConnection } from 'typeorm';
import { Role } from '../role/role.entity';
import { RoleRepository } from '../role/role.repository';
import { RoleType } from '../role/roletype.enum';
import { UserDetails } from './user.details.entity';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private readonly _userRepository: UserRepository,
        @InjectRepository(RoleRepository)
        private readonly _roleRepository: RoleRepository
    ) {}

    async get(id: number): Promise<User> {
        if (!id) {
            throw new BadRequestException('Id must be sent.');
        }

        const user: User = await this._userRepository.findOne(id, {
            where: { status: Status.ACTIVE },
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async getAll(): Promise<User[]> {
        const users: User[] = await this._userRepository.find({
            where: { status: Status.ACTIVE },
        });
        
        return users;
    }

    async create(user: User): Promise<User> {
        const details = new UserDetails();
        user.details = details;

        const repo = await getConnection().getRepository(Role);
        const defaultRole = await repo.findOne({ where: { name: RoleType.GENERAL } });
        user.roles = [defaultRole];

        const savedUser: User = await this._userRepository.save(user);

        return savedUser;
    }

    async update(id: number, user: User): Promise<void> {
        await this._userRepository.update(id, user);
    }

    async delete(id: number): Promise<void> {
        const userExists = await this._userRepository.findOne(id, {
            where: { status: Status.ACTIVE }
        });

        if (!userExists) {
            throw new NotFoundException();
        }

        await this._userRepository.update(id, {status: Status.INACTIVE});
    }

    async setRoleToUser(userId: number, roleId: number) {
        const userExist = await this._userRepository.findOne(userId, {
          where: { status: Status.ACTIVE },
        });
    
        if (!userExist) {
          throw new NotFoundException();
        }
    
        const roleExist = await this._roleRepository.findOne(roleId, {
          where: { status: Status.ACTIVE },
        });
    
        if (!roleExist) {
          throw new NotFoundException('Role does not exist.');
        }
    
        userExist.roles.push(roleExist);
        await this._userRepository.save(userExist);
    
        return true;
    }
}
