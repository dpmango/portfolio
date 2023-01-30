import { Module } from '@nestjs/common'

import { GithubModule } from './github/github.module'
import config from '../core/config/nest.config'
import db from '../core/config/db.config'

@Module({
  imports: [config, db, GithubModule],
})
export class RootModule {}
