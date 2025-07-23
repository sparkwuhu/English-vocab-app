import { Link, useLocation } from 'react-router-dom'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/study', label: '学习', icon: '📚' },
    { path: '/test', label: '测试', icon: '📝' },
    { path: '/progress', label: '进度', icon: '📊' },
    { path: '/settings', label: '设置', icon: '⚙️' },
  ]

  return (
    <nav className="bottom-navigation">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default Navigation