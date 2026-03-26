/**
 * 首页组件
 */
function HomePage() {
  return (
    <div className="home-page">
      <h2>欢迎使用 GitHub Copilot Demo</h2>
      <p>这是一个演示项目，展示如何使用 React 19 和 TypeScript 构建应用。</p>
      <p>您可以通过左侧菜单导航到不同的页面：</p>
      <ul>
        <li>首页 - 当前页面</li>
        <li>列表页 - 查看和管理任务列表</li>
        <li>新增 - 添加新的任务</li>
      </ul>
    </div>
  )
}

export default HomePage