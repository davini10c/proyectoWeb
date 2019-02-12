import {IsEmpty, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class ParcelaCreateDto {


    @IsNotEmpty()
    @IsString()

    codigo:string;

    @IsNotEmpty()
    @IsString()

    medidas:string;

    @IsNotEmpty()

    usuario:string;

    @IsNotEmpty()

    hacienda:string;

}