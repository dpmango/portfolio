import cns from 'classnames'

export const DevBadge: React.FC = () => {
  if (!isDevelopmentSite) return null

  return (
    <div
      style={{
        position: 'absolute',
        right: 0,
        top: '65%',
        background: 'tomato',
        color: 'white',
        fontSize: 10,
        fontWeight: 600,
        borderRadius: 4,
        opacity: 0.85,
        padding: '0.2em 0.35em',
      }}
    >
      {APP_VERSION}
    </div>
  )
}
