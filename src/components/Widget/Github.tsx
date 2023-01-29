import cns from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import st from './Github.module.scss'

export const WidgetGithub: React.FC = () => {
  const [menu, setMenu] = useState(false)
  const { githubData } = useAppSelector((state) => state.widgetStore)

  const { t } = useTranslation('widget', { keyPrefix: 'github' })
  const dispatch = useAppDispatch()

  useEffect(() => {
    // dispatch(getGithubInfo())
    // dispatch(getGithubRepos())
  }, [])

  return (
    <div className="relative my-10">
      <div className="container">
        <div className="text-center text-2xl">{t('title')}</div>

        <div className={st.stats}>
          <span>Followers: {githubData?.followers}</span>
          <span>Floowing: {githubData?.following}</span>
          <span>Repos: {githubData?.public_repos}</span>
        </div>
      </div>
    </div>
  )
}
