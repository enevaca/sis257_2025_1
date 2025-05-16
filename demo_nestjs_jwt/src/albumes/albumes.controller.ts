import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlbumesService } from './albumes.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-albume.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('albumes')
export class AlbumesController {
  constructor(private readonly albumesService: AlbumesService) {}

  @Post()
  create(@Body() createAlbumeDto: CreateAlbumDto) {
    return this.albumesService.create(createAlbumeDto);
  }

  @Get()
  findAll() {
    return this.albumesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumesService.findOne(+id);
  }

  @Get('artista/:id')
  findAllByArtista(@Param('id') id: string) {
    return this.albumesService.findAllByArtista(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumeDto: UpdateAlbumDto) {
    return this.albumesService.update(+id, updateAlbumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumesService.remove(+id);
  }
}
