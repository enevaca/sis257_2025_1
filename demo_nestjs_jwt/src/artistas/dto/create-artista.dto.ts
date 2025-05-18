import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateArtistaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El campo nombre no debe ser mayor a 50 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nacionalidad es obligatorio' })
  @IsString({ message: 'El campo nacionalidad debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El campo nacionalidad no debe ser mayor a 30 caracteres' })
  readonly nacionalidad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo fotografia es obligatorio' })
  @IsString({ message: 'El campo fotografia debe ser de tipo cadena' })
  @MaxLength(500, { message: 'El campo fotografia no debe ser mayor a 500 caracteres' })
  readonly fotografia: string;
}
