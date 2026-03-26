import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './components/HomePage'
import FormPage, { ListItem } from './components/FormPage'
import ListPage from './components/ListPage'

/** 初始列表数据 */
let initialItems: ListItem[] = [
  { id: 1, name: '学习 React 19', description: '了解 React 19 的新特性', completed: false },
  { id: 2, name: '学习 TypeScript', description: '掌握 TypeScript 类型系统', completed: true },
  { id: 3, name: '研究 Vite', description: '探索 Vite 构建工具', completed: false },
  { id: 4, name: '使用 GitHub Copilot', description: '提升 AI 辅助编码效率', completed: true },
]

/**
 * 应用根组件
 */
function App() {
  let [items, setItems] = useState<ListItem[]>(initialItems)
  let [nextId, setNextId] = useState(initialItems.length + 1)

  /**
   * 添加新列表项
   */
  function handleAddItem(item: Omit<ListItem, 'id' | 'completed'>) {
    let newItem: ListItem = {
      id: nextId,
      name: item.name,
      description: item.description,
      completed: false,
    }
    setItems([...items, newItem])
    setNextId(nextId + 1)
  }

  return (
    <Router>
      <div className="app">
        <header>
          <h1>GitHub Copilot Demo</h1>
        </header>
        
        <div className="app-content">
          <nav className="sidebar">
            <ul>
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/list">列表页</Link>
              </li>
              <li>
                <Link to="/form">新增</Link>
              </li>
            </ul>
          </nav>
          
          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/list" element={<ListPage items={items} setItems={setItems} />} />
              <Route path="/form" element={<FormPage onAddItem={handleAddItem} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
