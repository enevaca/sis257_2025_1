import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CancionesService {
  constructor(@InjectRepository(Cancion) private cancionesRepository: Repository<Cancion>) {}

  async create(createCancionDto: CreateCancionDto): Promise<Cancion> {
    const existe = await this.cancionesRepository.findOneBy({
      nombre: createCancionDto.nombre.trim(),
      idAlbum: createCancionDto.idAlbum,
      idGenero: createCancionDto.idGenero,
    });

    if (existe) throw new ConflictException('El cancion ya existe');

    const cancion = new Cancion();
    cancion.idAlbum = createCancionDto.idAlbum;
    cancion.idGenero = createCancionDto.idGenero;
    cancion.nombre = createCancionDto.nombre.trim();
    cancion.duracion = createCancionDto.duracion.trim();
    cancion.tags = createCancionDto.tags.trim();
    cancion.url = createCancionDto.url.trim();
    return this.cancionesRepository.save(cancion);
  }

  async findAll(): Promise<Cancion[]> {
    return this.cancionesRepository.find({
      relations: { album: true, genero: true },
      select: {
        id: true,
        nombre: true,
        duracion: true,
        tags: true,
        url: true,
        album: { id: true, nombre: true },
        genero: { id: true, descripcion: true },
      },
    });
  }

  async findOne(id: number): Promise<Cancion> {
    const cancion = await this.cancionesRepository.findOne({
      where: { id },
      relations: { album: true, genero: true },
    });

    if (!cancion) throw new NotFoundException('El cancion no existe');

    return cancion;
  }

  async update(id: number, updateCancionDto: UpdateCancionDto): Promise<Cancion> {
    const cancion = await this.findOne(id);
    Object.assign(cancion, updateCancionDto);
    return this.cancionesRepository.save(cancion);
  }

  async remove(id: number) {
    const cancion = await this.findOne(id);
    return this.cancionesRepository.softRemove(cancion);
  }
}
