import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DeepPartial } from 'typeorm'

import { IGithubRepoDto } from '../../core/interface/Github'
import { RepoModel, ProfileModel } from './dto'
import { getAuthenticated, getRepositories } from '../../core'

@Injectable()
export class GithubService {
  constructor(
    @InjectRepository(ProfileModel)
    private profileStore: Repository<ProfileModel>,
    @InjectRepository(RepoModel)
    private repoStore: Repository<RepoModel>,
  ) {}

  // db actions
  findAll(): Promise<IGithubRepoDto[]> {
    return this.repoStore.find()
  }

  findOne({ id }: { id: number }): Promise<IGithubRepoDto | null> | null {
    if (!id) return null

    return this.repoStore.findOneBy({ id })
  }

  // api actions

  async githubRepos(params): Promise<DeepPartial<RepoModel>[] | null> {
    let response = [] as DeepPartial<RepoModel>[] | null

    try {
      const { data: authData, error: authError } = await getAuthenticated()
      if (!authData) throw new Error('not autrized, check token')

      // save user database
      const { id, login, email, name, avatar_url, bio, public_repos, followers } = authData

      let saveOrUpdateObject = {
        login,
        name: name || '',
        email: email || '',
        avatar_url,
        bio: bio || '',
        public_repos,
        followers,
      }

      const searchProfile = await this.profileStore.findOneBy({ login })

      if (searchProfile?.id) {
        saveOrUpdateObject = {
          ...saveOrUpdateObject,
          id: searchProfile?.id,
        } as any
      }

      const profileSaved = await this.profileStore.save(saveOrUpdateObject)

      // get user repos
      const { data, error } = await getRepositories({ login: authData?.login })
      if (error) throw new Error('error getting repos')

      if (data) {
        const mapRepositories = data.map((x) => ({
          id: x.id,
          name: x.name,
          full_name: x.full_name,
          private: x.private,
          default_branch: x.default_branch,
          profileId: profileSaved.id,
        }))

        console.log(mapRepositories)

        const savedRepos = await this.repoStore.save(mapRepositories)
        console.log(savedRepos)
        response = savedRepos
      }
    } catch (err) {
      response = null
    }

    return response
  }
}
