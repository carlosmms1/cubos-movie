import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsArray,
  IsDateString,
  IsOptional,
  IsUrl,
  IsEnum,
  IsNumber,
  Min,
  ArrayNotEmpty,
} from 'class-validator';
import { MovieStatus } from 'generated/prisma';

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  originalTitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  release: string;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : value))
  duration: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  genre: string[];

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  cast: string;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  languages: string[];

  @IsString()
  @IsOptional()
  budget?: string;

  @IsString()
  @IsOptional()
  revenue?: string;

  @IsString()
  @IsOptional()
  profit?: string;

  @IsUrl()
  @IsOptional()
  trailerUrl?: string;

  @IsEnum(MovieStatus)
  @IsOptional()
  status?: MovieStatus;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : value))
  popularity?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? parseInt(value, 10) : value))
  voteCount?: number;
}
