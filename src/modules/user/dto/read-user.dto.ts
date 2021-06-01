import { IsEmail, IsNumber, IsString } from "class-validator";
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDetailDto } from "./read-user-details.dto";

export class ReadUserDto {
    @IsNumber()
    readonly id: number;

    @IsEmail()
    readonly email: string;

    @IsEmail()
    readonly username: string;

    @Type(type => ReadUserDetailDto)
    readonly details: ReadUserDetailDto
}