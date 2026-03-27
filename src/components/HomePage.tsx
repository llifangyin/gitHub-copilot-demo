import './HomePage.css'

/**
 * 首页组件，自动填充内容，支持滚动和炫酷动画
 */
function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>欢迎来到 Copilot Demo</h1>
        <p>体验 AI 赋能的现代前端开发流程，探索自动补全、智能对话、Agent 自动化等前沿能力。</p>
      </section>
      <section className="features">
        <h2>核心特性</h2>
        <ul>
          <li>⚡ 极速开发体验，Vite + React 19</li>
          <li>🤖 Copilot 智能补全与对话</li>
          <li>🧠 Agent 模式自动完成复杂任务</li>
          <li>📝 一键生成单元测试与文档</li>
          <li>🔒 规范化 TypeScript + JSDoc + ESM</li>
          <li>🎨 现代动画与交互体验</li>
        </ul>
      </section>
      <section className="showcase">
        <h2>项目亮点</h2>
        <div className="card-list">
          <div className="card">多模型切换，适配不同场景</div>
          <div className="card">全链路自动化：从代码到 PR 审查</div>
          <div className="card">自定义指令与 Prompt 资产沉淀</div>
          <div className="card">MCP 集成，打通外部工具链</div>
        </div>
      </section>
      <section className="long-content">
        <h2>更多内容</h2>
        <p>本项目覆盖 Copilot 全功能链路，包含：</p>
        <ol>
          <li>内联补全与多行函数生成</li>
          <li>Inline Chat 精准对话与重构</li>
          <li>Copilot Chat 全局问答与测试生成</li>
          <li>Edit/Agent 模式多文件自动化</li>
          <li>Prompt/Skill/Agent 资产管理</li>
          <li>PR 审查与自动摘要</li>
          <li>终端 CLI 智能命令生成</li>
          <li>PUA 激励引擎，助力成长</li>
        </ol>
        <p>滚动查看更多内容，体验动画效果！</p>
        <div className="filler">
          <p>—— Copilot 让开发更高效、更有趣、更智能！</p>
          <p>—— 你准备好迎接 AI 时代的挑战了吗？</p>
          <p>—— 现在就开始探索吧！</p>
        </div>
      </section>
    </div>
  )
}

export default HomePage