import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { GithubController } from './github.controller'
import { GithubService } from './github.service'
import { RepoModel, ProfileModel } from './dto'

import { GithubEffect } from './dto/github.effect'

@Module({
  imports: [TypeOrmModule.forFeature([RepoModel, ProfileModel])],
  controllers: [GithubController],
  providers: [GithubService, GithubEffect],
})
export class GithubModule {}
