import { DevBadge } from '@ui'
import cns from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

interface IAtomTech {
  tech: string
}

export const ProjecAtomTech: React.FC<IAtomTech> = ({ tech, ...rest }) => {
  const [menu, setMenu] = useState(false)

  const { t } = useTranslation('projects')

  return (
    <div className="mr-2 rounded-sm py-2 px-3" {...rest}>
      {tech.label}
    </div>
  )
}
