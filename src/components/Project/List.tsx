import cns from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { IProject } from '@/core/interface/Project'

import { ProjecAtomTech } from './Atom'
import st from './List.module.scss'

export const ProjectsList: React.FC = () => {
  const [menu, setMenu] = useState(false)
  const { projectList } = useAppSelector((state) => state.projectStore)

  const { t } = useTranslation('projects')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProjects())
  }, [])

  console.log(projectList)
  return (
    <div className={st.list}>
      <div className="container">
        <div className={st.listHead}>{t('title')}</div>

        <div className={st.listGrid}>
          {arrayExists(projectList).map((project: IProject) => (
            <div className="border border-gray-800 p-4" key={project.id} data-id={project.id}>
              {project.title}

              <div className="flex">
                {project.tech_stack.map((tech, idx) => (
                  <ProjecAtomTech key={idx} tech={tech.id} />
                ))}
              </div>

              <a
                href={project.sources.github.url}
                target="_blank"
                className="mt-2 text-lg"
                rel="noreferrer"
              >
                Перейти
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
