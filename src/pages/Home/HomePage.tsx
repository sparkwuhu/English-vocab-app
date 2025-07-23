import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { loadWordSets, loadWordsFromSet } from '../../store/slices/vocabularySlice'
import { startSession } from '../../store/slices/studySlice'
import { Link, useNavigate } from 'react-router-dom'
import { dbInitializer } from '../../services/database/initDB'

const HomePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { progress } = useAppSelector(state => state.user)
  const { wordSets, currentWordSet, loading } = useAppSelector(state => state.vocabulary)
  const [dbStatus, setDbStatus] = useState<unknown>(null)

  useEffect(() => {
    // 加载单词库列表
    dispatch(loadWordSets())
    
    // 检查数据库状态
    checkDatabaseStatus()
  }, [dispatch])

  const checkDatabaseStatus = async () => {
    try {
      const status = await dbInitializer.getDatabaseStatus()
      setDbStatus(status)
      console.log('数据库状态:', status)
    } catch (error) {
      console.error('检查数据库状态失败:', error)
    }
  }

  const resetDatabase = async () => {
    try {
      await dbInitializer.resetDatabase()
      // 重新加载数据
      dispatch(loadWordSets())
      await checkDatabaseStatus()
      alert('数据库重置成功！')
    } catch (error) {
      console.error('重置数据库失败:', error)
      alert('重置数据库失败')
    }
  }

  useEffect(() => {
    // 如果有单词库且还没有加载单词，加载默认单词库的单词
    if (wordSets.length > 0 && currentWordSet.length === 0) {
      const defaultWordSet = wordSets.find(set => set.isDefault) || wordSets[0]
      if (defaultWordSet) {
        dispatch(loadWordsFromSet(defaultWordSet.id))
      }
    }
  }, [wordSets, currentWordSet.length, dispatch])

  const handleStartStudy = () => {
    if (currentWordSet.length > 0) {
      // 创建学习会话
      const session = {
        id: `session-${Date.now()}`,
        userId: 'default-user',
        startTime: new Date(),
        wordsStudied: [],
        testResults: [],
        totalTime: 0,
        sessionType: 'study' as const
      }
      
      // 启动学习会话
      dispatch(startSession({ 
        session, 
        words: currentWordSet 
      }))
      
      // 跳转到学习页面
      navigate('/study')
    }
  }

  if (loading && wordSets.length === 0) {
    return (
      <div className="home-page">
        <div className="loading">加载中...</div>
      </div>
    )
  }

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>英语单词学习</h1>
        <p>提升你的英语词汇量</p>
      </header>

      <div className="stats-overview">
        <div className="stat-card">
          <h3>已学单词</h3>
          <p className="stat-number">{progress.totalWordsStudied}</p>
        </div>
        <div className="stat-card">
          <h3>掌握单词</h3>
          <p className="stat-number">{progress.masteredWords}</p>
        </div>
        <div className="stat-card">
          <h3>学习天数</h3>
          <p className="stat-number">{progress.studyStreak}</p>
        </div>
      </div>

      {/* 单词库选择 */}
      {wordSets.length > 0 && (
        <div className="word-sets-section">
          <h3>选择单词库</h3>
          <div className="word-sets-grid">
            {wordSets.map((wordSet) => (
              <div 
                key={wordSet.id} 
                className="word-set-card"
                onClick={() => dispatch(loadWordsFromSet(wordSet.id))}
              >
                <h4>{wordSet.name}</h4>
                <p>{wordSet.description}</p>
                <div className="word-set-info">
                  <span className="word-count">{wordSet.wordCount} 个单词</span>
                  <span className={`difficulty difficulty-${wordSet.difficulty}`}>
                    {wordSet.difficulty === 1 ? '初中' : 
                     wordSet.difficulty === 2 ? '高中' :
                     wordSet.difficulty === 3 ? '四级' :
                     wordSet.difficulty === 4 ? '六级' : '专家'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 当前单词库信息 */}
      {currentWordSet.length > 0 && (
        <div className="current-wordset-info">
          <p>当前单词库：<strong>{currentWordSet.length}</strong> 个单词已加载</p>
        </div>
      )}

      {/* 调试信息 */}
      {dbStatus && (
        <div className="debug-info">
          <p>数据库状态: {dbStatus.wordsCount} 个单词, {dbStatus.wordSetsCount} 个单词库</p>
          <button className="debug-btn" onClick={resetDatabase}>
            重置数据库
          </button>
        </div>
      )}

      <div className="quick-actions">
        <button 
          className="action-btn primary" 
          onClick={handleStartStudy}
          disabled={currentWordSet.length === 0}
        >
          开始学习
        </button>
        <Link to="/test" className="action-btn secondary">
          快速测试
        </Link>
      </div>
    </div>
  )
}

export default HomePage