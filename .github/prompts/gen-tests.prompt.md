---
mode: edit
---

为选中的函数生成完整的 Jest 单元测试：

1. 测试文件命名为 `{文件名}.test.ts`，与源文件放在同级目录
2. 覆盖三类用例：正常输入、边界值、非法输入
3. 使用 `describe` / `it` 结构，用例描述用中文
4. 错误处理统一使用 `try-catch`，禁止 `.catch()`
5. 使用 TypeScript，禁用 `any` 类型
6. 所有 `describe` 和 `it` 块必须有 JSDoc 注释说明测试意图
