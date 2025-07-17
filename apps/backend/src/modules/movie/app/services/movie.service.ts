import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { StorageService } from 'src/modules/shared/app/services/storage.service';
import { CreateMovieDTO } from '../dtos/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async uploadCoverImage(file: Express.Multer.File): Promise<string> {
    return this.storage.uploadFile(file);
  }

  async createMovie(data: CreateMovieDTO, creatorId: string) {
    return this.prisma.movie.create({
      data: {
        title: data.title,
        originalTitle: data.originalTitle,
        description: data.description,
        release: data.release,
        duration: data.duration,
        genre: { set: data.genre },
        director: data.director,
        cast: data.cast,
        coverImage: data.coverImage,
        languages: { set: data.languages },
        budget: data.budget ?? '',
        revenue: data.revenue ?? '',
        profit: data.profit ?? '',
        trailerUrl: data.trailerUrl ?? '',
        status: data.status ?? undefined,
        popularity: data.popularity ?? 0,
        voteCount: data.voteCount ?? 0,
        creator: { connect: { id: creatorId } },
      },
    });
  }
}
