import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-albume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumesService {
  constructor(@InjectRepository(Album) private albumesRepository: Repository<Album>) {}

  async create(createAlbumeDto: CreateAlbumDto): Promise<Album> {
    const existe = await this.albumesRepository.findOneBy({
      nombre: createAlbumeDto.nombre.trim(),
      idArtista: createAlbumeDto.idArtista,
    });

    if (existe) throw new ConflictException('El album ya existe');

    const album = new Album();
    album.idArtista = createAlbumeDto.idArtista;
    album.nombre = createAlbumeDto.nombre.trim();
    album.fechaLanzamiento = createAlbumeDto.fechaLanzamiento;
    return this.albumesRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumesRepository.find({
      relations: { artista: true },
      select: {
        id: true,
        nombre: true,
        fechaLanzamiento: true,
        artista: { id: true, nombre: true },
      },
    });

    // return this.albumesRepository
    //   .createQueryBuilder('albumes')
    //   .innerJoin('albumes.artista', 'artista')
    //   .select([
    //     'albumes.id',
    //     'albumes.nombre',
    //     'albumes.fechaLanzamiento',
    //     'artista.id',
    //     'artista.nombre',
    //   ])
    //   .getMany();
  }

  async findOne(id: number): Promise<Album> {
    const album = await this.albumesRepository.findOne({
      where: { id },
      relations: { artista: true },
    });

    if (!album) throw new NotFoundException('El album no existe');

    return album;
  }

  async findAllByArtista(idArtista: number): Promise<Album[]> {
    return this.albumesRepository.findBy({ idArtista });
  }

  async update(id: number, updateAlbumeDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    Object.assign(album, updateAlbumeDto);
    return this.albumesRepository.save(album);
  }

  async remove(id: number) {
    const album = await this.findOne(id);
    return this.albumesRepository.softRemove(album);
  }
}
