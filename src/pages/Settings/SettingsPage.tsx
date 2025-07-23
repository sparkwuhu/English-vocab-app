import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { updatePreferences } from '../../store/slices/userSlice'

const SettingsPage = () => {
  const { preferences } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const handlePreferenceChange = (key: string, value: any) => {
    dispatch(updatePreferences({ [key]: value }))
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h2>设置</h2>
      </header>

      <div className="settings-content">
        <div className="settings-section">
          <h3>学习偏好</h3>
          
          <div className="setting-item">
            <label>每日学习目标</label>
            <input 
              type="number" 
              value={preferences.dailyGoal}
              onChange={(e) => handlePreferenceChange('dailyGoal', parseInt(e.target.value))}
              min="1"
              max="100"
            />
          </div>

          <div className="setting-item">
            <label>复习模式</label>
            <select 
              value={preferences.reviewMode}
              onChange={(e) => handlePreferenceChange('reviewMode', e.target.value)}
            >
              <option value="spaced">间隔重复</option>
              <option value="random">随机复习</option>
            </select>
          </div>

          <div className="setting-item">
            <label>
              <input 
                type="checkbox" 
                checked={preferences.enableAudio}
                onChange={(e) => handlePreferenceChange('enableAudio', e.target.checked)}
              />
              启用音频
            </label>
          </div>

          <div className="setting-item">
            <label>
              <input 
                type="checkbox" 
                checked={preferences.autoPlay}
                onChange={(e) => handlePreferenceChange('autoPlay', e.target.checked)}
              />
              自动播放发音
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>关于应用</h3>
          <p>英语单词学习应用 v1.0.0</p>
          <p>帮助你高效学习英语词汇</p>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage