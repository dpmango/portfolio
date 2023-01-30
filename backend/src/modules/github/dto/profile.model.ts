import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity()
export class ProfileModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  // @Index({ unique: true })
  login: string

  @Column({ default: null })
  name: string

  @Column({ default: null })
  email: string

  @Column()
  avatar_url: string

  @Column({ default: null })
  bio: string

  @Column()
  public_repos: number

  @Column()
  followers: number

  // @Column('simple-array')
  // stats: string[]
}
