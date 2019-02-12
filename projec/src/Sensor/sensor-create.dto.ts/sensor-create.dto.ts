import {IsEmpty, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class SensorCreateDto {


    @IsNotEmpty()
    @IsString()

    codigoSensor:string;



    @IsNotEmpty()

    subparcela:number;


}