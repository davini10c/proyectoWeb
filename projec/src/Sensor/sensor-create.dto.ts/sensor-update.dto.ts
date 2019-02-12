import {IsEmpty, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class SensorUpdateDto {


    @IsNotEmpty()
    @IsString()

    codigoSensor: string;


    @IsNotEmpty()

    subparcela: number;


}