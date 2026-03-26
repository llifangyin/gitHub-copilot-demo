import { useState } from 'react'

/** 列表项数据结构 */
export interface ListItem {
  id: number
  name: string
  description: string
  completed: boolean
}

/**
 * 表单页面组件
 * 用于添加新的任务到列表
 */
function FormPage({ onAddItem }: { onAddItem: (item: Omit<ListItem, 'id' | 'completed'>) => void }) {
  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  let [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  /**
   * 表单验证
   */
  function validateForm(): boolean {
    const newErrors: { name?: string; description?: string } = {}
    
    if (!name.trim()) {
      newErrors.name = '任务名称不能为空'
    }
    
    if (!description.trim()) {
      newErrors.description = '任务描述不能为空'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * 提交表单
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (validateForm()) {
      onAddItem({ name: name.trim(), description: description.trim() })
      setName('')
      setDescription('')
      setErrors({})
    }
  }

  return (
    <div className="form-page">
      <h2>添加新任务</h2>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="name">任务名称</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => {
              if (!name.trim()) {
                setErrors({ ...errors, name: '任务名称不能为空' })
              } else {
                const newErrors = { ...errors }
                delete newErrors.name
                setErrors(newErrors)
              }
            }}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">任务描述</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            onBlur={() => {
              if (!description.trim()) {
                setErrors({ ...errors, description: '任务描述不能为空' })
              } else {
                const newErrors = { ...errors }
                delete newErrors.description
                setErrors(newErrors)
              }
            }}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            提交
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormPage