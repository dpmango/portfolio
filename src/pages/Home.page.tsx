import { Layout } from '@c/Layout'
import { ProjectsList } from '@c/Project'
import { WidgetGithub } from '@c/Widget'
import cns from 'classnames'
import { Helmet } from 'react-helmet'

export const HomePage: React.FC = () => {
  const [loaderShown, setLoaderShown] = useState<boolean>(false)
  const { userData } = useAppSelector((state) => state.userStore)

  const { search } = useLocation()
  const { lockScroll, unlockScroll } = useScrollLock()

  return (
    <Layout>
      <Helmet>
        <title>{import.meta.env.VITE_APP_APP_NAME} | Homepage</title>
      </Helmet>

      <main className={cns('content')}>
        <WidgetGithub />
        <ProjectsList />
      </main>
    </Layout>
  )
}
