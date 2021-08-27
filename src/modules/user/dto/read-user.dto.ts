import { IsEmail, IsNumber, IsString } from "class-validator";
import { Exclude, Expose, Type } from 'class-transformer';
import { ReadUserDetailDto } from "./read-user-details.dto";
import { ReadRoleDto } from "../../role/dto";

@Exclude()
export class ReadUserDto {
    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsEmail()
    readonly email: string;

    @Expose()
    @IsEmail()
    readonly username: string;

    @Expose()
    @Type(type => ReadUserDetailDto)
    readonly details: ReadUserDetailDto

    @Expose()
    @Type(type => ReadRoleDto)
    readonly roles: ReadRoleDto[];
}