import {IsEmpty, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class HaciendaUpdateDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 30)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 100)
    direccion: string;

    @IsNotEmpty()
    @Length(9, 10)
    telefono: string;

    @IsNotEmpty()
    @IsNumber()
    region: number

}