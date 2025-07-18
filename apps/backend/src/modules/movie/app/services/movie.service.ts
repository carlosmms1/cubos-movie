import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from 'generated/prisma';

import { PrismaService } from 'src/modules/prisma/prisma.service';
import { StorageService } from 'src/modules/shared/app/services/storage.service';
import { CreateMovieDTO } from '../dtos/create-movie.dto';
import { ListMovieDTO } from '../dtos/list-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}

  async uploadCoverImage(file: Express.Multer.File): Promise<string> {
    return this.storage.uploadFile(file);
  }

  async findById(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!movie) {
      throw new NotFoundException(`Filme não encontrado!`);
    }

    return movie;
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

  async list(params: ListMovieDTO) {
    const {
      title,
      status,
      director,
      duration,
      releaseStart,
      releaseEnd,
      page = 1,
      pageSize = 10,
    } = params;

    const where: Prisma.MovieWhereInput = {};

    if (title) {
      where.OR = [
        { title: { contains: title, mode: 'insensitive' } },
        { originalTitle: { contains: title, mode: 'insensitive' } },
      ];
    }
    if (status) {
      where.status = status;
    }
    if (director) {
      where.director = { contains: director, mode: 'insensitive' };
    }
    if (duration) {
      where.duration = duration;
    }
    if (releaseStart || releaseEnd) {
      where.release = {};
      if (releaseStart) {
        where.release.gte = new Date(releaseStart);
      }
      if (releaseEnd) {
        where.release.lte = new Date(releaseEnd);
      }
    }

    const skip = (page - 1) * pageSize;
    const [movies, total] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.movie.count({ where }),
    ]);

    return {
      data: movies,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }
}
