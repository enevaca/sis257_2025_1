import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistasService {
  constructor(@InjectRepository(Artista) private artistasRepository: Repository<Artista>) {}

  async create(createArtistaDto: CreateArtistaDto): Promise<Artista> {
    const existe = await this.artistasRepository.findOneBy({
      nombre: createArtistaDto.nombre.trim(),
      nacionalidad: createArtistaDto.nacionalidad.trim(),
    });

    if (existe) throw new ConflictException('El artista ya existe');

    const artista = new Artista();
    artista.nombre = createArtistaDto.nombre.trim();
    artista.nacionalidad = createArtistaDto.nacionalidad.trim();
    return this.artistasRepository.save(artista);
  }

  async findAll() {
    return this.artistasRepository.find();
  }

  async findOne(id: number): Promise<Artista> {
    const artista = await this.artistasRepository.findOneBy({ id });
    if (!artista) throw new NotFoundException('El artista no existe');
    return artista;
  }

  async update(id: number, updateArtistaDto: UpdateArtistaDto) {
    const artista = await this.findOne(id);
    const artistaUpdate = Object.assign(artista, updateArtistaDto);
    return this.artistasRepository.save(artistaUpdate);
  }

  async remove(id: number) {
    const artista = await this.findOne(id);
    if (artista) return this.artistasRepository.softRemove(artista);
  }
}
