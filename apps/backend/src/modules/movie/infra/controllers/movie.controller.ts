import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Request,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { CreateMovieDTO } from '../../app/dtos/create-movie.dto';
import { MovieService } from '../../app/services/movie.service';

@UseGuards(AuthGuard('jwt'))
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseInterceptors(FileInterceptor('coverImage'))
  async create(
    @Body() createMovieDto: CreateMovieDTO,
    @UploadedFile() coverImage: Express.Multer.File,
    @Request() req,
  ) {
    if (!coverImage) {
      throw new BadRequestException('A imagem de capa é obrigatória.');
    }
    createMovieDto.coverImage =
      await this.movieService.uploadCoverImage(coverImage);
    return this.movieService.createMovie(createMovieDto, req.user?.id);
  }
}
