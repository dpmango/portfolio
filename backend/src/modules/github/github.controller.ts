import { Controller, Get, Query, Param } from '@nestjs/common'
import { GithubService } from './github.service'

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('/live')
  getRepos(@Param() params?) {
    return this.githubService.githubRepos(params)
  }

  @Get('/repos')
  savedRepos() {
    return this.githubService.findAll()
  }

  @Get('/repo:name')
  getRepoByName(@Param() params: any) {
    return this.githubService.findOne(params)
  }
}
