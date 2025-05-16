import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Artista } from 'src/artistas/entities/artista.entity';

export class CreateAlbumDto {
  @ApiProperty()
  @IsDefined({ message: 'El campo idArtista debe estar definido' })
  @IsInt({ message: 'El campo idArtista debe ser de tipo numérico' })
  readonly idArtista: Artista['id'];

  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre no debe ser vacío' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(70, { message: 'El campo nombre no debe ser mayor a 70 caracteres' })
  readonly nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'El campo fechaLanzamiento debe estar definido' })
  @IsDateString({}, { message: 'El campo fechaLanzamiento debe ser tipo fecha' })
  readonly fechaLanzamiento: Date;
}
