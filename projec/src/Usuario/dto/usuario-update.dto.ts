import {IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class UsuarioUpdateDto {


    @IsNotEmpty()
    @IsString()
    @Length(5, 30)
    nombreUsuario: string;//nombre del campo para llenar

    @IsNotEmpty()
    @IsString()
    @Length(5, 100)
    direccionUsuario: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    cedulaUsuario: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    contraseñaUsuario: string;

    @IsNotEmpty()
    @IsString()
    @Length(9, 10)
    telefonoUsuario: string;

    @IsNotEmpty()
    hacienda: number

}