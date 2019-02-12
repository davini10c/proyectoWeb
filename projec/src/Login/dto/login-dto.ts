import {IsNotEmpty, IsNumber, IsNumberString, IsString, Length} from "class-validator";

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    @Length(10)
    cedula : String;


    @IsNotEmpty()
    @IsString()
    @Length(4, 20)
    password: string;



}