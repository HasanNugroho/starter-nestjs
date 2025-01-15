import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto {
    @ApiProperty({
        required: true,
        example: "adam@user.com"
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        required: true,
        example: "adam123"
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
