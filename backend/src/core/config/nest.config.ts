import { ConfigModule } from '@nestjs/config'

const configuration = () => ({
  port: process.env.PORT || 8000,
})

export default ConfigModule.forRoot({
  load: [configuration],
})
