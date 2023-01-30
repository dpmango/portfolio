export interface IGithubRepoDto {
  id: number
  name: string
  private: boolean
  visible?: boolean
  image?: string
  // commits: IGithubCommitDto[]
}

export interface IGithubCommitDto {
  date: string
  title: string
}

export interface IGetRepositoriesRequest {
  login: string
}
