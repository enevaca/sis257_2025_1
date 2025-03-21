import { Injectable } from '@nestjs/common';
import { CreateArtistaDto } from './dto/create-artista.dto';
import { UpdateArtistaDto } from './dto/update-artista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artista } from './entities/artista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistasService {
  constructor(@InjectRepository(Artista) private artistasRepository: Repository<Artista>) {}

  async create(createArtistaDto: CreateArtistaDto) {
    return this.artistasRepository.save(createArtistaDto);
  }

  async findAll() {
    return this.artistasRepository.find();
  }

  async findOne(id: number) {
    return this.artistasRepository.findOneBy({ id });
  }

  async update(id: number, updateArtistaDto: UpdateArtistaDto) {
    return this.artistasRepository.save({ id, ...updateArtistaDto });
  }

  async remove(id: number) {
    const artista = await this.findOne(id);
    if (artista) return this.artistasRepository.softRemove(artista);
  }
}
