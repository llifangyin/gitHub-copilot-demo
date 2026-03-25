---
description: "为 TypeScript 工具函数生成 Jest 单元测试，覆盖正常输入、边界值、非法输入三类用例"
argument-hint: "要测试的函数名或文件路径（留空则使用当前选中代码）"
agent: agent
---

为提供的 TypeScript 工具函数生成完整的 Jest 单元测试文件。

## 输出要求

- 测试文件命名为 `{原文件名}.test.ts`，与源文件放在**同级目录**
- 使用 `import` 从源文件导入被测函数，禁止 `require()`

## 测试结构

每个函数使用三层 `describe` / `it` 嵌套：

```
describe('<函数名>', () => {
  describe('正常输入', () => { ... })
  describe('边界值',   () => { ... })
  describe('非法输入', () => { ... })
})
```

所有 `describe` / `it` 描述文字**使用中文**。

## 编码规范（与项目 copilot-instructions.md 保持一致）

- 所有 `describe` 和 `it` 块顶部必须有 **JSDoc 注释**说明测试意图
- 禁用 `any` 类型，所有变量和参数必须有明确 TypeScript 类型注解
- 错误处理统一使用 `try-catch`，禁止 `.catch()`
- 使用 `import/export`，禁止 `require()`

## 三类用例覆盖标准

| 类别 | 覆盖内容 |
|------|---------|
| 正常输入 | 典型参数，断言返回值完全匹配预期 |
| 边界值 | 空值、极大/极小值、特殊日期（如闰年、纪元起点）等 |
| 非法输入 | 无效参数，断言抛出 `Error` 且消息内容符合预期 |
