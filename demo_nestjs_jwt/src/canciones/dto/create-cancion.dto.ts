import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Album } from 'src/albumes/entities/album.entity';
import { Genero } from 'src/generos/entities/genero.entity';

export class CreateCancionDto {
  @ApiProperty()
  @Type(() => Number)
  @IsDefined({ message: 'El campo idAlbum debe estar definido' })
  @IsInt({ message: 'El campo idAlbum debe ser de tipo numérico' })
  readonly idAlbum: Album['id'];

  @ApiProperty()
  @Type(() => Number)
  @IsDefined({ message: 'El campo idGenero debe estar definido' })
  @IsInt({ message: 'El campo idGenero debe ser de tipo numérico' })
  readonly idGenero: Genero['id'];

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(40, { message: 'El campo nombre no debe ser mayor a 40 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo duracion no debe ser vacío' })
  @IsString({ message: 'El campo duracion debe ser de tipo cadena' })
  @MaxLength(8, { message: 'El duracion nombre no debe ser mayor a 8 caracteres' })
  readonly duracion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo tags no debe ser vacío' })
  @IsString({ message: 'El campo tags debe ser de tipo cadena' })
  @MaxLength(30, { message: 'El tags nombre no debe ser mayor a 30 caracteres' })
  readonly tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo url no debe ser vacío' })
  @IsString({ message: 'El campo url debe ser de tipo cadena' })
  @MaxLength(250, { message: 'El url nombre no debe ser mayor a 250 caracteres' })
  readonly url: string;
}
