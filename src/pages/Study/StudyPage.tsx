import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { nextWord, previousWord, endSession } from '../../store/slices/studySlice'
import { useNavigate } from 'react-router-dom'

const StudyPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { currentWord, sessionProgress, isSessionActive, wordsInSession, currentIndex } = useAppSelector(state => state.study)
  const [showDefinition, setShowDefinition] = useState(false)

  useEffect(() => {
    // 如果没有活跃的学习会话，跳转回首页
    if (!isSessionActive) {
      navigate('/')
    }
  }, [isSessionActive, navigate])

  const handleNextWord = () => {
    if (currentIndex < wordsInSession.length - 1) {
      dispatch(nextWord())
      setShowDefinition(false) // 重置显示状态
    } else {
      // 学习完成
      handleEndSession()
    }
  }

  const handlePreviousWord = () => {
    if (currentIndex > 0) {
      dispatch(previousWord())
      setShowDefinition(false) // 重置显示状态
    }
  }

  const handleEndSession = () => {
    dispatch(endSession())
    navigate('/')
  }

  const toggleDefinition = () => {
    setShowDefinition(!showDefinition)
  }

  if (!isSessionActive || !currentWord) {
    return (
      <div className="study-page">
        <div className="loading">加载中...</div>
      </div>
    )
  }

  return (
    <div className="study-page">
      <header className="study-header">
        <h2>单词学习</h2>
        <div className="session-info">
          <span>{currentIndex + 1} / {wordsInSession.length}</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${sessionProgress}%` }}
          />
        </div>
      </header>

      <div className="study-content">
        <div className="word-card-container">
          <div className="word-card" onClick={toggleDefinition}>
            <h2 className="word">{currentWord.word}</h2>
            <p className="pronunciation">{currentWord.pronunciation}</p>
            
            {showDefinition && (
              <>
                <div className="definitions">
                  {currentWord.definitions.map((def, index) => (
                    <div key={index} className="definition">
                      <span className="part-of-speech">{def.partOfSpeech}</span>
                      <span className="meaning">{def.meaning}</span>
                    </div>
                  ))}
                </div>
                
                {currentWord.examples && currentWord.examples.length > 0 && (
                  <div className="examples">
                    <h4>例句：</h4>
                    {currentWord.examples.map((example, index) => (
                      <div key={index} className="example">
                        <p className="sentence">"{example.sentence}"</p>
                        <p className="translation">{example.translation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {!showDefinition && (
              <p className="hint">点击卡片查看释义</p>
            )}
          </div>
          
          <div className="study-controls">
            <button 
              className="control-btn" 
              onClick={handlePreviousWord}
              disabled={currentIndex === 0}
            >
              上一个
            </button>
            
            <button className="control-btn secondary" onClick={handleEndSession}>
              结束学习
            </button>
            
            <button 
              className="control-btn primary" 
              onClick={handleNextWord}
            >
              {currentIndex === wordsInSession.length - 1 ? '完成' : '下一个'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudyPage