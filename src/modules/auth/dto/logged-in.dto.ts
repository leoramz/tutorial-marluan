import { IsString } from 'class-validator';
import {Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDto } from '../../user/dto';

@Exclude()
export class LoggedInDto {
    @Expose()
    @IsString()
    token: string;
    
    @Expose()
    @Type(() => ReadUserDto)
    user: ReadUserDto;
}