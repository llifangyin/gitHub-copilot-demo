import { useState } from 'react'

/** 列表项数据结构 */
interface ListItem {
  id: number
  name: string
  description: string
  completed: boolean
}

/** 初始列表数据 */
let initialItems: ListItem[] = [
  { id: 1, name: '学习 React 19', description: '了解 React 19 的新特性', completed: false },
  { id: 2, name: '学习 TypeScript', description: '掌握 TypeScript 类型系统', completed: true },
  { id: 3, name: '研究 Vite', description: '探索 Vite 构建工具', completed: false },
  { id: 4, name: '使用 GitHub Copilot', description: '提升 AI 辅助编码效率', completed: true },
]

/**
 * 列表页面组件
 * 支持添加、删除、搜索、标记完成等功能
 */
function ListPage() {
  let [items, setItems] = useState<ListItem[]>(initialItems)
  let [searchText, setSearchText] = useState('')
  let [newName, setNewName] = useState('')
  let [newDesc, setNewDesc] = useState('')
  let [nextId, setNextId] = useState(initialItems.length + 1)

  /**
   * 过滤后的列表（按搜索关键词）
   */
  let filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
  )

  /**
   * 添加新列表项
   */
  function handleAdd() {
    if (!newName.trim()) return
    let newItem: ListItem = {
      id: nextId,
      name: newName.trim(),
      description: newDesc.trim(),
      completed: false,
    }
    setItems([...items, newItem])
    setNextId(nextId + 1)
    setNewName('')
    setNewDesc('')
  }

  /**
   * 切换列表项完成状态
   * @param id - 列表项 ID
   */
  function handleToggle(id: number) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  /**
   * 删除列表项
   * @param id - 列表项 ID
   */
  function handleDelete(id: number) {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="list-page">
      <h2>任务列表</h2>

      {/* 搜索框 */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="搜索任务..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="count">共 {filteredItems.length} 条</span>
      </div>

      {/* 添加新任务 */}
      <div className="add-form">
        <input
          type="text"
          placeholder="任务名称"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <input
          type="text"
          placeholder="任务描述"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button onClick={handleAdd} disabled={!newName.trim()}>
          添加
        </button>
      </div>

      {/* 列表 */}
      <ul className="item-list">
        {filteredItems.map((item) => (
          <li key={item.id} className={item.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(item.id)}
            />
            <div className="item-content">
              <span className="item-name">{item.name}</span>
              <span className="item-desc">{item.description}</span>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>
              删除
            </button>
          </li>
        ))}
        {filteredItems.length === 0 && (
          <li className="empty">暂无匹配的任务</li>
        )}
      </ul>
    </div>
  )
}

export default ListPage
