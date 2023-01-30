import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm'

import { ProfileModel } from './profile.model'

@Entity()
export class RepoModel {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  full_name: string

  @Column()
  private: boolean

  @Column({ default: false })
  visible: boolean

  @Column()
  default_branch: string

  // @Column({ default: '' })
  // image?: string

  // @Column()
  // commits: { date: string; title: string }[]

  @OneToOne(() => ProfileModel)
  @JoinColumn()
  profile: ProfileModel
}
