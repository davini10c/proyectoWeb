import {IsNotEmpty, IsString, Length} from "class-validator";

export class RegionUpdateDto {

    @IsNotEmpty()
    @IsString()
    @Length(3, 15)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 100)
    descripcion: string;


}