export interface IProject {
  id: number
  nda: boolean | null
  start_date?: string
  end_date?: string
  title: string
  locale?: string
  tech_stack: IProjectStack[]
  demo: {
    url: string
  }
  estimates: {
    hours: number
  }
  sources: {
    github: {
      url: string
      public: boolean
    }
  }
}

export interface IProjectStack {
  id: 'react' | 'vue' | 'nuxt' | 'next' | 'vite' | 'webpack' | 'eslint' | 'prettier'
}
