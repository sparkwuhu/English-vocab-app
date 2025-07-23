import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from './hooks/redux'
import { initializeUser } from './store/slices/userSlice'
import HomePage from './pages/Home/HomePage'
import StudyPage from './pages/Study/StudyPage'
import TestPage from './pages/Test/TestPage'
import ProgressPage from './pages/Progress/ProgressPage'
import SettingsPage from './pages/Settings/SettingsPage'
import Navigation from './components/common/Navigation'
import './App.css'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // 初始化用户
    dispatch(initializeUser({ id: 'user-' + Date.now() }))
  }, [dispatch])

  return (
    <div className="app">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
      <Navigation />
    </div>
  )
}

export default App
