import { useState } from 'react'
import { Link } from 'react-router-dom'

/** 列表项数据结构 */
export interface ListItem {
  id: number
  name: string
  description: string
  completed: boolean
}

/**
 * 列表页面组件
 * 支持添加、删除、搜索、标记完成等功能
 */
function ListPage({ items, setItems }: { items: ListItem[]; setItems: React.Dispatch<React.SetStateAction<ListItem[]>> }) {
  let [searchText, setSearchText] = useState('')

  /**
   * 过滤后的列表（按搜索关键词）
   */
  let filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase())
  )

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
      <div className="list-header">
        <h2>任务列表</h2>
        <Link to="/form" className="add-btn">
          新增
        </Link>
      </div>

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
