import { useAppSelector } from '../../hooks/redux'

const TestPage = () => {
  const { currentTest, currentQuestion, isTestActive } = useAppSelector(state => state.test)

  return (
    <div className="test-page">
      <header className="test-header">
        <h2>单词测试</h2>
        {isTestActive && currentTest && (
          <div className="test-progress">
            <span>{currentQuestion + 1} / {currentTest.questions.length}</span>
          </div>
        )}
      </header>

      <div className="test-content">
        {!isTestActive ? (
          <div className="test-start">
            <h3>选择测试类型</h3>
            <div className="test-options">
              <button className="test-option">选择题测试</button>
              <button className="test-option">填空题测试</button>
              <button className="test-option">听写测试</button>
            </div>
          </div>
        ) : currentTest ? (
          <div className="test-question">
            <div className="question-content">
              <h3>测试进行中...</h3>
              <p>题目内容将在这里显示</p>
            </div>
            
            <div className="test-controls">
              <button className="control-btn">上一题</button>
              <button className="control-btn primary">下一题</button>
            </div>
          </div>
        ) : (
          <div className="loading">加载中...</div>
        )}
      </div>
    </div>
  )
}

export default TestPage