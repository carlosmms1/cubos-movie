import { Module } from '@nestjs/common';

import { MovieService } from './app/services/movie.service';
import { MovieController } from './infra/controllers/movie.controller';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
