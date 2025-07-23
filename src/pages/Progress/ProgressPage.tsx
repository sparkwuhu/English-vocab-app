import { useAppSelector } from '../../hooks/redux'

const ProgressPage = () => {
  const { progress } = useAppSelector(state => state.user)

  return (
    <div className="progress-page">
      <header className="progress-header">
        <h2>学习进度</h2>
      </header>

      <div className="progress-content">
        <div className="progress-stats">
          <div className="stat-grid">
            <div className="stat-item">
              <h4>总学习时间</h4>
              <p className="stat-value">{Math.floor(progress.totalStudyTime / 60)} 小时</p>
            </div>
            <div className="stat-item">
              <h4>平均准确率</h4>
              <p className="stat-value">{progress.averageAccuracy.toFixed(1)}%</p>
            </div>
            <div className="stat-item">
              <h4>连续学习</h4>
              <p className="stat-value">{progress.studyStreak} 天</p>
            </div>
            <div className="stat-item">
              <h4>掌握单词</h4>
              <p className="stat-value">{progress.masteredWords}</p>
            </div>
          </div>
        </div>

        <div className="weekly-progress">
          <h3>本周学习情况</h3>
          <div className="progress-chart">
            {progress.weeklyProgress.map((count, index) => (
              <div key={index} className="progress-bar-item">
                <div 
                  className="bar" 
                  style={{ height: `${Math.max(count * 10, 5)}px` }}
                />
                <span className="day-label">
                  {['周一', '周二', '周三', '周四', '周五', '周六', '周日'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressPage