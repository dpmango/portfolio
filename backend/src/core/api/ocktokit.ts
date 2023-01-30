import { Octokit } from 'octokit'
import { IGetRepositoriesRequest } from '../interface/Github'

// methods
export const getAuthenticated = async () => {
  // console.log({ auth: process.env.PRIVATE_GITHUB_ACCESS_TOKEN })
  const octokit = new Octokit({ auth: process.env.PRIVATE_GITHUB_ACCESS_TOKEN })

  try {
    const { data } = await octokit.rest.users.getAuthenticated()

    return { data, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}

export const getRepositories = async ({ login }: IGetRepositoriesRequest) => {
  try {
    const octokit = new Octokit({ auth: process.env.PRIVATE_GITHUB_ACCESS_TOKEN })

    const { data } = await octokit.rest.repos.listForUser({
      username: login,
      per_page: 100,
      sort: 'created',
    })

    return { data, error: null }
  } catch (err) {
    return { data: null, error: err }
  }
}
