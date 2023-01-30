import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { RepoModel } from './repo.model'

@EventSubscriber()
export class GithubEffect implements EntitySubscriberInterface<RepoModel> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this)
  }

  listenTo() {
    return RepoModel
  }

  beforeInsert(event: InsertEvent<RepoModel>) {
    // console.log('DB::Github::RepoModel')
    // console.log(`BEFORE RepoModel INSERTED: `, event.entity)
  }
}
