import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

const { DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env

export default TypeOrmModule.forRoot({
  type: 'postgres',
  synchronize: true,
  host: DATABASE_HOST,
  port: DATABASE_PORT ? +DATABASE_PORT : 5432,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  logging: false,
  autoLoadEntities: true,

  entities: [join(__dirname, '../../', '**', '**/*.model{.ts,.js}')],
})
