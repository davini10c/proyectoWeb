import {IsEmpty, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class SubparcelaUpdateDto {


    @IsNotEmpty()
    @IsString()

    codigo: string;

    @IsNotEmpty()
    @IsString()

    medidas: string;

    @IsNotEmpty()

    parcela: number;


}