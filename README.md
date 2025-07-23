# 英语单词学习应用

一个基于React + TypeScript的现代化英语词汇学习应用，采用间隔重复算法帮助用户高效记忆单词。

## 功能特性

- 📚 **单词库管理** - 支持多种难度级别的词汇库
- 🎯 **智能学习** - 基于间隔重复算法的个性化学习
- 📝 **多种测试** - 选择题、填空题、听写测试
- 📊 **进度跟踪** - 详细的学习统计和进度分析
- 🎵 **音频支持** - 标准发音和TTS语音合成
- 📱 **响应式设计** - 支持手机、平板、桌面设备

## 技术栈

- **前端框架**: React 19 + TypeScript
- **状态管理**: Redux Toolkit
- **路由**: React Router v7
- **构建工具**: Vite
- **样式**: CSS3 + 响应式设计
- **本地存储**: IndexedDB + LocalStorage

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── common/         # 通用组件
│   ├── WordCard/       # 单词卡片组件
│   ├── AudioPlayer/    # 音频播放器
│   └── ...
├── pages/              # 页面组件
│   ├── Home/           # 首页
│   ├── Study/          # 学习页面
│   ├── Test/           # 测试页面
│   └── ...
├── store/              # Redux状态管理
│   ├── slices/         # Redux切片
│   └── index.ts        # Store配置
├── services/           # 业务服务
│   ├── database/       # 数据库服务
│   ├── learning/       # 学习算法
│   └── audio/          # 音频服务
├── types/              # TypeScript类型定义
├── utils/              # 工具函数
├── hooks/              # 自定义Hooks
└── config/             # 配置文件
```

## 开发指南

### 环境要求

- Node.js >= 18.0.0
- npm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 代码检查

```bash
npm run lint
```

## 核心算法

### 间隔重复算法 (SM-2)

应用采用改进的SM-2算法来计算单词的复习间隔：

- **初始间隔**: 1天
- **成功复习**: 间隔 × 难度系数
- **失败复习**: 重置为1天
- **难度调整**: 根据用户表现动态调整

### 个性化推荐

- 识别用户薄弱单词
- 优先推荐需要复习的内容
- 根据学习效果调整难度

## 数据模型

### 核心实体

- **Word**: 单词信息（拼写、发音、释义、例句）
- **UserProgress**: 用户学习进度
- **StudySession**: 学习会话记录
- **TestResult**: 测试结果

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

- 项目链接: [https://github.com/your-username/english-vocab-app](https://github.com/your-username/english-vocab-app)
- 问题反馈: [Issues](https://github.com/your-username/english-vocab-app/issues)