import { DevBadge } from '@ui'
import cns from 'classnames'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/logo.svg'

export const Header: React.FC = () => {
  const [menu, setMenu] = useState(false)

  const { t } = useTranslation('header')

  return (
    <header className="sticky top-0 bottom-0">
      <div className="container">
        <div className="flex justify-between py-2">
          <Link to="/" className="relative max-w-[40px]">
            <img src={logo} alt="logo" />
            <DevBadge />
          </Link>

          <div className={cns('p-4', menu && '_active')} onClick={() => setMenu(!menu)}>
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
