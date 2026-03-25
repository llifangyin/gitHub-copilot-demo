# 从零到精通 GitHub Copilot in VS Code
> 2026 年完整实战指南 —— 以 `github-copilot-demo` 项目为例  
> 📅 更新日期：2026-03-25

---

## 目录

1. [认识 Copilot —— 环境准备与界面熟悉](#第一章认识-copilot--环境准备与界面熟悉)
2. [内联补全 —— 最基础的 AI 辅助](#第二章内联补全--最基础的-ai-辅助)
3. [Inline Chat —— 编辑器内精准对话](#第三章inline-chat--编辑器内精准对话)
4. [Copilot Chat —— 全功能对话面板](#第四章copilot-chat--全功能对话面板)
5. [Edit Mode —— 受控的多文件编辑](#第五章edit-mode--受控的多文件编辑)
6. [Agent Mode —— 自主完成复杂任务 ⭐](#第六章agent-mode--自主完成复杂任务-)
7. [自定义与扩展 —— 让 Copilot 更懂你](#第七章自定义与扩展--让-copilot-更懂你)
8. [MCP 集成 —— 连接外部工具](#第八章mcp-集成--连接外部工具)
9. [Copilot CLI —— 终端里的 AI 助手](#第九章copilot-cli--终端里的-ai-助手)
10. [代码审查与 PR 工作流](#第十章代码审查与-pr-工作流)
11. [总结与最佳实践](#第十一章总结与最佳实践)

---

## 第一章：认识 Copilot —— 环境准备与界面熟悉

### 1. 什么是 GitHub Copilot（2026 版简介）

GitHub Copilot 是由 GitHub 与 OpenAI 联合打造的 AI 编程助手，深度集成在 VS Code 中。2026 版的 Copilot 已从单纯的"代码补全工具"演进为能够自主规划、跨文件修改、执行终端命令、连接外部工具的**编程代理（Agent）**。

核心能力：
- **内联补全**：在你打字时实时预测并提示代码
- **Inline Chat**：在编辑器内选中代码后直接对话
- **Copilot Chat**：全功能对话面板，支持问答、修复、生成测试
- **Edit Mode**：手动指定文件范围，受控地进行多文件修改
- **Agent Mode**：描述目标，AI 自主规划并完成复杂任务

### 2. 安装与登录

**安装步骤：**
1. 打开 VS Code 扩展面板（`Ctrl+Shift+X`）
2. 搜索 `GitHub Copilot`，安装官方扩展（同时建议安装 `GitHub Copilot Chat`）
3. 安装后点击状态栏右下角的 Copilot 图标，按提示登录 GitHub 账号
4. 完成授权后图标变为激活状态

**方案对比：**

| 方案 | 价格 | 适合人群 | 核心限制 |
|------|------|----------|----------|
| Free | 免费 | 个人学习 | 每月有限次数的补全和 Chat |
| Pro | $10/月 | 独立开发者 | 无限补全，完整 Agent 功能 |
| Business | $19/用户/月 | 团队 | 企业安全策略、审计日志 |
| Enterprise | 定制 | 大型企业 | 私有模型微调、合规管理 |

### 3. 认识界面

**Chat 面板（`Ctrl+Alt+I`）：**  
主要交互入口，支持多轮对话、斜杠命令、Context 变量引用。对话历史会自动保留，可在左侧历史列表中切换。

**Agent 下拉选择器：**  
Chat 面板顶部的模式切换器，三种模式功能不同：

| 模式 | 说明 |
|------|------|
| **Ask** | 纯问答模式，不修改文件，适合查询和解释 |
| **Edit** | 手动添加文件到上下文，受控修改，每步需确认 |
| **Agent** | 自主模式，AI 决定修改哪些文件、是否执行命令 |

**模型选择器：**  
点击 Chat 输入框右侧的模型名可切换，不同模型有不同侧重：
- **GPT-4o**：综合能力强，速度快
- **Claude Sonnet**：长文本和代码推理能力突出
- **Gemini**：谷歌系任务（如 Google Cloud）表现好

### 4. 项目初始化：`/init`

在 Chat 面板输入 `/init`，Copilot 会自动扫描项目结构，在 `.github/copilot-instructions.md` 生成一份描述项目技术栈、目录结构和编码规范的自定义指令文件。后续所有对话都会以此为上下文，让 Copilot 的回答更贴近你的项目实际。

> 💡 建议每个新项目都执行一次 `/init`，并手动审查生成的内容是否准确。

### 实战练习题

> 完成以下练习，验证你已掌握本章内容。

1. **安装验证**：在 VS Code 扩展面板搜索 `GitHub Copilot`，安装后确认状态栏右下角出现 Copilot 图标，截图记录登录成功的状态。
2. **界面探索**：按 `Ctrl+Alt+I` 打开 Chat 面板，在输入框中输入 `/help`，阅读所有可用斜杠命令列表，找出你还不认识的命令并记录下来。
3. **模型对比**：分别切换 GPT-4o 和 Claude Sonnet，对同一个问题（如"什么是闭包？"）各提问一次，对比回答风格有何不同。
4. **项目初始化**：在 `github-copilot-demo` 项目根目录打开 Chat，运行 `/init`，查看 Copilot 为项目自动生成的 `.github/copilot-instructions.md` 文件内容是否符合预期。
5. **Agent 选择器**：点击 Chat 面板顶部的 Agent 下拉选择器，分别切换到 `Ask`、`Edit`、`Agent` 三种模式，理解每种模式的用途差异。

---

## 第二章：内联补全 —— 最基础的 AI 辅助

### 1. 代码自动补全

内联补全是 Copilot 最基础的能力——当你在编辑器中停止输入约 300ms 后，Copilot 会以**灰色幽灵文字**显示预测补全内容。

**常用快捷键：**

| 按键 | 作用 |
|------|------|
| `Tab` | 接受当前补全建议 |
| `Esc` | 拒绝当前建议，继续手动输入 |
| `Alt+]` | 查看下一个候选补全方案 |
| `Alt+[` | 查看上一个候选补全方案 |
| `Ctrl+→` | 逐词接受（只接受补全的一部分） |

> 💡 当多个候选项之间质量差异明显时，用 `Alt+]` / `Alt+[` 多看几个再做决定。

### 2. Next Edit Suggestions（下一步编辑预测）

Next Edit Suggestions 是一个更智能的预测功能（Public Preview）：当你修改了代码的某一处（如重命名变量、更改函数签名），Copilot 会**预测你下一步最可能需要修改的位置**，用高亮箭头指示，按 `Tab` 即可跳转并一键接受修改。

**典型场景：**
- 将参数名 `user` 改为 `account` → Copilot 自动预测函数体内所有引用都需要同步修改
- 更改函数返回类型 → Copilot 预测调用处的变量赋值也需对应调整

### 3. 多行函数补全实战

只需写出**函数签名或描述性注释**，Copilot 即可补全完整的多行函数体。示例：

```js
// 将秒数转换为 HH:MM:SS 格式的字符串
function formatDuration(seconds) {
  // Copilot 会在这里补全完整实现
}
```

补全质量的关键在于：函数名、参数名能清晰表达意图，或注释描述足够具体。

### 4. 技巧：用注释引导更精准的补全

注释的描述精度直接决定补全质量。对比：

| 注释写法 | 补全质量 |
|---------|---------|
| `// 格式化日期` | 模糊，可能生成任意格式 |
| `// 将 Date 对象格式化为 YYYY-MM-DD 字符串，不依赖外部库` | 精准，直接生成符合要求的代码 |
| `// 防抖函数，delay 毫秒内重复调用只执行最后一次` | 精准，并暗示了实现逻辑 |

**最佳实践：**
- 注明输入输出的类型和格式
- 说明不允许使用的依赖（"不依赖第三方库"）
- 描述边界情况（"空数组时返回 null"）

### 实战练习题

> 完成以下练习，感受内联补全在真实编码中的价值。

1. **接受补全**：新建文件 `src/utils.js`，在第一行写注释 `// 去除数组中的重复元素，返回新数组`，按回车后等待补全出现，按 `Tab` 接受，观察生成的函数是否正确。
2. **拒绝与切换**：在同一文件再写注释 `// 深拷贝一个对象`，当补全出现后，按 `Alt+]` 切换到下一个候选项，对比至少两个方案后选择你认为最好的。
3. **注释引导精准补全**：尝试分别用以下两段注释触发补全，记录补全质量的差异：
   - 模糊版：`// 格式化日期`
   - 精准版：`// 将 Date 对象格式化为 YYYY-MM-DD 字符串，不依赖任何外部库`
4. **多行函数补全**：只写函数签名 `function debounce(fn, delay) {`，观察 Copilot 是否能补全完整的防抖函数实现，验证逻辑是否正确。
5. **Next Edit Suggestions**：修改已有函数的参数名（如将 `arr` 改为 `list`），观察 Copilot 是否自动预测并高亮下一处需要同步修改的位置。

---

## 第三章：Inline Chat —— 编辑器内精准对话

### 1. 触发 Inline Chat（`Ctrl+I`）

Inline Chat 让你无需离开编辑器就能与 Copilot 对话。触发方式：
- 将光标放在某行，按 `Ctrl+I` → 对当前上下文提问
- **选中一段代码**后按 `Ctrl+I` → 以选中代码为操作对象进行对话

对话框以浮层形式出现在编辑器内，Copilot 的修改建议会以内联 diff 形式预览，你可以点击 **Accept** 接受或 **Discard** 拒绝，也可以继续追问修改。

### 2. 对选中代码提问：解释、重构、添加注释

选中代码后触发 Inline Chat，常见用法：

| 输入内容 | 效果 |
|----------|------|
| `/explain` | 解释选中代码的逻辑 |
| `重构为更简洁的写法` | Copilot 原地修改代码 |
| `用 early return 替换 if-else` | 按你的要求重构 |
| `添加完整的 JSDoc 注释` | 生成文档注释覆盖到选中函数 |
| `这段代码有没有 bug？` | Copilot 分析并指出潜在问题 |

Inline Chat 的优势在于**上下文极为精准**——你选中什么，Copilot 就只处理什么，不会误改其他代码。

### 3. 全新 Inline Chat 体验

2026 版 Inline Chat 做了以下改进：
- **流式渲染**：Copilot 的修改逐字符显示，不再等待全部完成
- **多轮对话**：在同一个 Inline Chat 框中可以连续追问调整，不必重新选中
- **撤回支持**：接受修改后仍可通过 `Ctrl+Z` 撤销
- **快速操作按钮**：常用指令（解释、修复、生成测试）在右键菜单中可直接触发

### 4. 实战：用 Inline Chat 为函数添加单元测试

以下面这个函数为例：

```js
function add(a, b) {
  return a + b;
}
```

**操作步骤：**
1. 选中整个函数
2. 按 `Ctrl+I`，输入"为这个函数生成 Jest 单元测试，覆盖正数、负数、0 和浮点数"
3. Copilot 会生成如下测试代码供你预览：

```js
describe('add', () => {
  test('两个正数相加', () => expect(add(1, 2)).toBe(3));
  test('正数加负数', () => expect(add(5, -3)).toBe(2));
  test('加零', () => expect(add(7, 0)).toBe(7));
  test('浮点数', () => expect(add(0.1, 0.2)).toBeCloseTo(0.3));
});
```

4. 点击 **Accept** → 将结果复制到 `math.test.js` 即可

> 💡 Inline Chat 生成的测试代码会直接覆盖/插入到选中位置，建议生成后手动移动到对应测试文件。

### 实战练习题

> 所有练习均在编辑器内通过 `Ctrl+I` 完成，不切换到 Chat 面板。

1. **解释代码**：打开 `src/utils.js`，全选 `debounce` 函数，按 `Ctrl+I` 输入 `/explain`，阅读 Copilot 的解释，确认其与你的理解一致。
2. **重构代码**：找一段使用多层 `if-else` 的代码，选中后按 `Ctrl+I` 输入"将 if-else 改为 early return 风格，提升可读性"，对比重构前后的差异并接受。
3. **添加注释**：选中 `debounce` 函数，通过 Inline Chat 要求"为这个函数添加完整的 JSDoc 注释，包含参数类型和示例"，接受结果。
4. **生成测试**：新建一个 `src/math.js`，写一个 `add(a, b)` 函数，选中后用 Inline Chat 要求"为这个函数生成 Jest 单元测试，覆盖正常值、负数和边界值"，将结果保存到 `src/math.test.js`。
5. **修改现有代码**：找一个没有错误处理的异步函数（或自己写一个），用 Inline Chat 要求"为这个函数添加 try-catch 错误处理，错误时返回 null"，接受修改。

---

## 第四章：Copilot Chat —— 全功能对话面板

### 1. 基础问答：代码解释、报错排查

Chat 面板支持自由的多轮对话，常见用途：

**代码解释：** 直接把代码粘贴到 Chat，问"这段代码是做什么的？" Copilot 会逐步解析逻辑。

**报错排查：** 将错误栈粘贴到 Chat，如：
```
TypeError: Cannot read properties of undefined (reading 'map')
  at processItems (utils.js:15)
```
Copilot 会结合上下文分析原因，并给出修复建议。

**最佳实践：** 提问时提供越多上下文（相关代码、错误信息、期望行为），Copilot 的回答越准确。

### 2. 常用斜杠命令速查

| 命令 | 作用 |
|------|------|
| `/fix` | 修复代码问题 |
| `/explain` | 解释代码逻辑 |
| `/tests` | 生成单元测试 |
| `/init` | 初始化项目指令 |
| `/new` | 创建新文件或项目脚手架 |
| `/doc` | 为选中代码生成文档 |

斜杠命令是对高频操作的快捷方式，直接在 Chat 输入框中以 `/` 开头输入即可触发。

### 3. 使用 Context 变量精准提问

| 变量 | 作用 |
|------|------|
| `@workspace` | 引用整个工作区，让 Copilot 理解全局结构 |
| `#file:路径` | 引用特定文件内容作为上下文 |
| `#selection` | 引用当前编辑器中已选中的内容 |
| `#editor` | 引用当前打开文件的全部内容 |
| `#sym:符号名` | 引用特定函数/类的定义 |

**示例用法：**
```
/explain #file:src/utils.js 中的 debounce 函数
@workspace 项目里有哪些地方调用了 fetchUser？
/tests #selection
```

### 4. 多模型切换实战

不同模型适合不同类型的任务：

| 任务类型 | 推荐模型 | 理由 |
|----------|----------|------|
| 快速代码补全/解释 | GPT-4o | 速度快，综合能力强 |
| 复杂逻辑推理/架构设计 | Claude Sonnet | 长文本处理和推理链更强 |
| 大型重构/代码审查 | Claude Sonnet | 上下文窗口大，不易丢失细节 |
| Google Cloud / Android 相关 | Gemini | 对 Google 生态理解更深 |

**切换方式：** 点击 Chat 输入框右侧的模型名称下拉，选择目标模型，同一对话框中可随时切换。

### 实战练习题

> 综合运用斜杠命令、Context 变量和多模型，感受 Chat 面板的完整能力。

1. **报错排查**：故意在 `src/utils.js` 中写一个语法错误（如少了右括号），将错误信息粘贴到 Chat 面板，让 Copilot 帮你定位并给出修复建议。
2. **`/explain` + `@file`**：在 Chat 中输入 `/explain #file:src/utils.js`，查看 Copilot 对整个文件的解读，确认它理解了所有函数的用途。
3. **`/tests` 生成测试**：打开 `src/math.js`，在 Chat 中输入 `/tests`，让 Copilot 生成完整的测试文件，将结果应用到项目中。
4. **多模型对比**：对同一段有性能问题的代码（如嵌套循环），分别用 GPT-4o 和 Claude Sonnet 提问"如何优化这段代码的时间复杂度？"，比较两者给出的方案。
5. **`@workspace` 全局提问**：在 Chat 中输入 `@workspace 这个项目目前有哪些文件？整体结构是什么？`，验证 Copilot 能否准确感知整个工作区。

---

## 第五章：Edit Mode —— 受控的多文件编辑

### 1. Edit Mode 介绍

Edit Mode 介于 Ask 和 Agent 之间，是一种**半自动、手动可控**的多文件编辑模式。

**核心特点：**
- **你决定范围**：手动将需要修改的文件添加到上下文（点击 📎 图标或拖拽文件）
- **逐轮确认**：每次修改都以 diff 视图展示，你审查后再决定接受或拒绝
- **不执行命令**：Edit Mode 只修改文件，不会自动运行终端命令（这点与 Agent Mode 不同）

**与其他模式的对比：**

| 模式 | 文件范围 | 是否执行命令 | 适合场景 |
|------|----------|------------|----------|
| Ask | 只读 | 否 | 查询和解释 |
| Edit | 手动指定 | 否 | 已知范围的批量修改 |
| Agent | AI 自主决定 | 是 | 复杂任务，允许 AI 发挥 |

### 2. 实战：用 Edit Mode 给项目统一添加错误处理

**场景：** 项目中有多个异步函数都缺少 try-catch 错误处理。

**操作流程：**
1. 切换到 **Edit** 模式
2. 将 `src/utils.js`、`src/api.js` 等相关文件添加到上下文
3. 输入："给所有 async 函数添加 try-catch，catch 块中 console.error 错误信息并返回 null"
4. Copilot 生成多文件的 diff 预览
5. 逐文件审查，接受需要的修改

> ⚠️ Edit Mode 不会猜测你没加进来的文件，所以如果有遗漏，修改可能不完整——这也是它"受控"的含义。

### 3. 接受 / 拒绝 diff 的工作流

Edit Mode 的 diff 视图与 Git diff 类似：
- **绿色行**：新增内容，点击行旁边的 ✓ 可接受单行
- **红色行**：删除内容
- **顶部按钮**：**Accept All**（接受全部）、**Discard All**（拒绝全部）

**精细操作技巧：**
- 对于大段修改，可以先 **Accept All**，再用 `Ctrl+Z` 撤回其中不需要的部分
- 也可以直接在 diff 视图中手动编辑生成的代码，Copilot 不会阻止你修改它的输出
- 完成一次 Edit 后，可以继续在同一对话中追加新指令进行下一轮修改

### 实战练习题

> 切换到 Edit 模式（Chat 面板顶部下拉选择 **Edit**），完成以下多文件受控编辑练习。

1. **指定文件范围**：手动将 `src/utils.js` 和 `src/math.js` 添加到 Edit 上下文，要求"给所有导出函数的参数添加非空校验，参数为空时抛出 TypeError"，逐行审查 diff 后选择性接受。
2. **统一代码风格**：在 Edit Mode 中对整个 `src/` 目录下的文件要求"将所有 `var` 声明替换为 `const` 或 `let`"，观察 Copilot 如何批量处理多个文件。
3. **提取常量**：要求 Edit Mode"将代码中所有硬编码的数字和字符串常量提取到 `src/constants.js` 文件中"，确认新文件被正确创建且原文件引用正常。
4. **部分拒绝**：在 Edit 的 diff 视图中，找到至少一处你不认同的修改，点击 **Reject** 拒绝该行，理解逐行审查的工作流。
5. **多轮编辑**：完成第一轮修改、接受后，再追加一轮要求"给所有函数添加 JSDoc 注释"，感受 Edit Mode 的多轮可控迭代能力。

---

## 第六章：Agent Mode —— 自主完成复杂任务 ⭐

> 核心亮点：描述目标 → AI 自动规划 → 跨文件修改 → 执行终端命令 → 自我纠错

### 1. Agent Mode 简介

Agent Mode 是 Copilot 最强大的模式，它能够**自主决策**：
- 判断需要读/写哪些文件
- 在终端执行命令（`npm install`、`git commit` 等）
- 运行测试，如果失败则自动分析原因并修复
- 循环迭代直到任务完成

**与 Edit Mode 的核心区别：**

| 维度 | Edit Mode | Agent Mode |
|------|-----------|------------|
| 文件选择 | 你手动指定 | AI 自主决定 |
| 执行命令 | ❌ 不执行 | ✅ 可执行终端命令 |
| 自我纠错 | ❌ | ✅ 运行失败会自动重试 |
| 适合场景 | 范围明确的修改 | 模糊目标的复杂任务 |

### 2. Plan Agent

Plan Agent 是 Agent Mode 的"思考前置"用法：在开始执行前，先让 AI **输出一份详细的实现计划**，你审阅并调整计划后，再让它按计划执行。

**使用方式：**
```
请先规划实现一个用户注册/登录 API 的方案，
包含文件结构、依赖选型和步骤清单，不要直接写代码。
```
审阅规划后再发送："方案 OK，开始按计划实现。"

**好处：** 复杂任务中，先规划能暴露出设计问题（如依赖冲突、遗漏模块），避免写到一半推倒重来。

### 3. 会话管理

**Fork a Conversation（分叉对话）：**  
在对话历史的任意一个检查点，点击 **Fork** 按钮，可以从该状态分支出一条新对话路径。这让你可以：
- 探索同一问题的不同实现方案
- 在 Agent 跑偏后从某个正确状态重新出发，而不是从头开始

**边运行边插队：**  
Agent 正在执行时（未完成），你可以直接在输入框发送新消息追加需求，Agent 会在当前步骤完成后理解并整合你的新指令，无需中断整个任务。

### 4. Auto-Approve 模式

默认情况下，Agent 执行每一步终端命令前都会弹出确认框。Auto-Approve 模式可以跳过确认：

```
/autoApprove   # 开启自动批准模式
/yolo          # 等效别名
```

> ⚠️ 建议仅在熟悉任务内容、或操作低风险文件时才开启 Auto-Approve，避免 Agent 误删文件或执行破坏性命令。

开启后，Agent 会配合**终端沙箱**（macOS/Linux）限制危险命令，Windows 上需自行注意。

### 5. 实战：让 Agent 从零搭建 Express API 服务

向 Agent 发送：
```
在 server/ 目录下从零搭建一个 Express REST API：
- GET /api/todos  返回 todos 列表
- POST /api/todos 添加新 todo
- DELETE /api/todos/:id 删除指定 todo
数据存储在内存数组中，完成后自动 npm install 并运行一次确认能正常启动。
```

Agent 的执行过程大致为：
1. 创建 `server/package.json`
2. 创建 `server/index.js`（含路由和内存存储）
3. 执行 `npm install`
4. 执行 `node index.js` 验证启动
5. 如果启动失败，自动检查错误日志并修复

### 实战练习题

> 切换到 Agent 模式，让 Copilot 在更少干预下完成复杂任务。

1. **从零搭建服务**：在 Agent Mode 中输入"在 `server/` 目录下从零搭建一个 Express Hello World 服务，包含 `package.json`、`index.js` 和一个 `GET /hello` 路由，完成后自动运行 `npm install`"，观察 Agent 如何自主规划、创建文件并执行终端命令。
2. **中途插队调整**：当 Agent 正在执行任务时（未完成前），追加消息"还需要加上请求日志中间件，使用 morgan"，观察 Agent 如何响应中途变更而不重启整个流程。
3. **Plan Agent**：重新打开一个对话，先发送"请先规划一个 TODO List CRUD API（含增删改查）的实现方案，不要直接写代码"，审阅规划后再发送"方案 OK，开始实现"，体会先规划再执行的好处。
4. **Fork Conversation**：在 Agent 完成 Express 服务后，使用 **Fork a Conversation** 功能从当前状态分支出两条路——一条要求用 `sqlite` 存储数据，另一条用内存数组存储，对比两种方案。
5. **Auto-Approve 体验**：在一个低风险的演练场景中，在 Agent 对话中输入 `/autoApprove`，让 Agent 完全自主地完成一个小任务（如生成 README），观察它不再弹出确认框的行为。

---

## 第七章：自定义与扩展 —— 让 Copilot 更懂你

### 1. Custom Instructions（自定义指令）

自定义指令是一个 Markdown 文件，存放在项目的 `.github/copilot-instructions.md`。Copilot 在每次对话时都会自动读取这个文件作为背景知识，相当于给 AI 的"永久系统提示"。

**可以写什么：**
- 技术栈说明（"使用 Vue 3 + TypeScript + Vite"）
- 编码规范（"不使用 any 类型，函数必须有返回值类型注解"）
- 命名约定（"文件名用 kebab-case，组件名用 PascalCase"）
- 禁止事项（"不使用 jQuery，不使用 class 组件"）
- 测试要求（"所有 util 函数必须有单元测试"）

**示例文件：**
```markdown
# Copilot 自定义指令

## 技术栈
- Node.js 20 + TypeScript 5
- Jest 用于测试，使用 ESM 模块

## 编码规范
- 所有函数必须有 JSDoc 注释
- 禁止使用 any 类型
- 错误处理统一使用 try-catch
- 使用 import/export，禁止 require()
```

### 2. Prompt Files（提示词文件）

Prompt Files 是可复用的提示词模板，存放在 `.github/prompts/` 目录下，文件名为 `*.prompt.md`。

**创建示例** `.github/prompts/gen-tests.prompt.md`：
```markdown
---
mode: edit
---
为选中的函数生成完整的 Jest 单元测试：
1. 测试文件命名为 {文件名}.test.ts
2. 覆盖正常输入、边界值、非法输入三类用例
3. 使用 describe/it 结构，用例描述用中文
```

**调用方式：** 在 Chat 中输入 `/gen-tests` 即可触发这个 prompt 模板。

### 3. 从对话生成可复用资产

在一次成功的对话后，可以将其固化为资产供日后复用：

| 命令 | 生成内容 | 存放位置 |
|------|----------|----------|
| `/create-prompt` | 将本次对话的核心 prompt 提取为 `.prompt.md` | `.github/prompts/` |
| `/create-skill` | 将专业领域知识打包为技能文件 | `.github/skills/` |
| `/create-agent` | 创建一个自定义 Agent 配置 | `.github/agents/` |
| `/create-hook` | 生成 Agent 生命周期钩子脚本 | `.github/hooks/` |

### 4. Hooks（钩子）

Hooks 让你在 Agent 执行的关键节点自动触发额外操作，无需人工干预。

**配置示例**（在 `.github/hooks/` 下创建钩子文件）：

```json
{
  "on": "file-changed",
  "run": "npx eslint --fix {{changedFiles}}"
}
```

**常见钩子场景：**
- `on: file-changed` → 自动运行 ESLint/Prettier 格式化
- `on: task-complete` → 自动运行测试套件，输出覆盖率报告
- `on: before-commit` → 运行类型检查，阻止有 TS 错误的提交

### 实战练习题

> 让 Copilot 真正理解你的项目规范，而不是每次都重新说明。

1. **创建自定义指令**：在项目根目录创建 `.github/copilot-instructions.md`，写入以下规范：
   ```
   - 所有函数必须有 JSDoc 注释
   - 使用 TypeScript，禁用 any 类型
   - 错误处理统一使用 try-catch，禁止 .catch()
   - 使用 ES Module（import/export），禁止 require()
   ```
   然后让 Copilot 生成一段新的工具函数，验证它是否自动遵循了上述规范。

2. **创建 Prompt 文件**：在 `.github/prompts/` 目录下创建 `gen-tests.prompt.md`，内容为你常用的"生成 Jest 单元测试"提示词模板，之后通过 `/gen-tests` 调用它，验证输出是否稳定可复用。

3. **`/create-prompt` 命令**：与 Copilot 完成一次生成测试的对话后，在 Chat 中输入 `/create-prompt`，让 Copilot 自动将这次对话中的有效 prompt 提取为文件保存。

4. **验证指令优先级**：同时存在全局自定义指令和项目级 `copilot-instructions.md` 时，尝试让它们的规定相互冲突（如一个要求用 `const`，另一个要求用 `let`），观察 Copilot 的取舍行为。

5. **Hooks 体验**：在 Agent 生命周期中配置一个 Hook，使其在每次 Agent 完成文件修改后自动运行 `eslint --fix`，验证代码风格的自动化修正是否生效。

---

## 第八章：MCP 集成 —— 连接外部工具

> MCP（Model Context Protocol）：通过 MCP 服务器让 Agent 与外部服务交互

### 1. MCP 基本概念与架构

MCP 是一个开放协议，让 AI 模型能够与外部工具和数据源进行标准化通信。可以理解为"给 Copilot 装插件"：

```
VS Code Copilot Agent
        ↓ MCP 协议
   MCP Server（本地进程或远程服务）
        ↓ 原生 API
   外部服务（GitHub / Jira / 数据库 / 文件系统…）
```

**MCP Server 的两种形态：**
- **本地进程型**：在你的机器上运行（如 `npx @github/mcp-server`），安全且低延迟
- **远程服务型**：通过 HTTPS 连接云端服务，需配置鉴权

**在 VS Code 中配置 MCP：** 打开设置 → 搜索 `mcp` → 在 `settings.json` 中添加服务器配置。

### 2. Agent Plugins

Agent Plugins 是打包好的"能力包"，一次安装即可获得 skill + tool + hook + MCP 的组合。在 VS Code 扩展市场搜索 `Copilot Agent Plugin` 可以找到社区和官方发布的插件。

安装后，Agent 在对话中会自动发现并调用这些新工具，无需额外配置提示词。

### 3. 实战：集成 GitHub MCP Server

**安装步骤：**

1. 在 `settings.json` 中添加：
```json
{
  "mcp.servers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@github/mcp-server"],
      "env": {
        "GITHUB_TOKEN": "your-personal-access-token"
      }
    }
  }
}
```
2. 重启 VS Code，在 Agent Mode 的工具列表中确认出现 `github_*` 工具
3. 在 Agent 对话中直接用自然语言操作 GitHub：

```
列出 llifangyin/gitHub-copilot-demo 仓库中所有 open Issues
为 #12 号 Issue 关联一个 PR，分支名为 fix/issue-12
```

### 4. MCP 服务器沙箱

在 macOS/Linux 系统上，MCP Server 在沙箱环境中运行，具备以下安全隔离：
- 限制文件系统访问范围（只能访问项目目录）
- 限制网络请求目标（只能访问预配置的域名）
- 命令执行白名单（危险命令会被阻断）

Windows 用户目前沙箱支持有限，需自行注意 MCP Server 的权限配置。

### 实战练习题

> MCP 是让 Copilot 从"代码助手"升级为"工具操作员"的关键。

1. **配置 GitHub MCP Server**：在 VS Code 的 MCP 设置中添加官方 GitHub MCP Server，完成 GitHub Token 认证，在 Agent Mode 中确认工具列表中出现 `github_*` 相关工具。
2. **读取 Issues**：通过 Agent 输入"列出 `llifangyin/gitHub-copilot-demo` 仓库中所有 open 的 Issues，以表格形式展示"，验证 MCP 是否成功调用 GitHub API。
3. **创建 Issue**：通过 Agent 输入"在当前仓库创建一个 Issue，标题为 '添加单元测试覆盖'，内容描述需要为 utils.js 的所有函数编写 Jest 测试"，在 GitHub 上确认 Issue 被成功创建。
4. **操作 PR**：创建一个新分支并做一次小改动，推送后通过 MCP 让 Copilot 直接为这个分支创建 Pull Request，包含自动生成的 PR 描述。
5. **探索其他 MCP**：在 VS Code 扩展市场搜索 MCP，安装一个非 GitHub 的 MCP 服务（如文件系统、数据库或 Slack），完成一次 Agent 通过 MCP 操作外部服务的完整流程。

---

## 第九章：Copilot CLI —— 终端里的 AI 助手

### 1. Copilot CLI 现已内置于 VS Code

2026 版的 Copilot CLI 不再需要单独安装 npm 包，已直接集成在 VS Code 终端中。新增能力：

- **diff 标签页**：CLI 生成的命令执行前，可以在 diff 视图中预览文件变化
- **右键发送代码片段**：在编辑器中选中代码，右键菜单选择 **Send to Copilot CLI**，可以直接在终端中针对这段代码提问
- **会话历史**：终端中的 AI 对话有历史记录，可以追问上一次的结果

### 2. 在终端内用自然语言执行操作

在终端输入自然语言描述，Copilot CLI 会生成对应的命令供你确认执行：

**Git 操作：**
```
# 输入：提交当前改动，信息描述"修复登录页面的样式问题"
# CLI 生成：git add . && git commit -m "fix: 修复登录页面的样式问题"

# 输入：查看上周的提交历史，只显示我自己的
# CLI 生成：git log --since="1 week ago" --author="$(git config user.name)"
```

**文件管理：**
```
# 输入：找出所有大于 1MB 的 JS 文件
# CLI 生成（Windows）：Get-ChildItem -Recurse -Filter "*.js" | Where-Object {$_.Length -gt 1MB}

# 输入：批量将 src/ 下所有 .js 文件重命名为 .ts
# CLI 生成：对应的批量重命名命令
```

### 3. 通过 CLI 交互 GitHub.com

配合 GitHub MCP 或 `gh` CLI，可以在终端直接完成 GitHub 操作：

```
# 列出仓库最近 5 个 PR
列出 llifangyin/gitHub-copilot-demo 最近 5 个 PR，显示标题和状态

# 创建 Issue
在当前仓库创建一个 Bug 类型的 Issue，标题"修复内存泄漏"

# 快速审查变更
对比 main 和 feature/login 分支的差异，总结主要改动
```

Copilot CLI 会将自然语言翻译为 `gh` 命令或 API 调用，并给出执行结果的摘要。

### 实战练习题

> 让终端也成为你的 AI 协作空间。

1. **自然语言提交**：对项目做一处改动，在终端中通过 Copilot CLI 输入"提交当前所有改动，用中文写提交信息，描述这次改动的目的"，观察 CLI 生成的 `git commit` 命令并确认执行。
2. **分支操作**：用 CLI 输入"创建一个新分支 `feature/add-api` 并切换过去，然后推送到远程仓库追踪"，验证 CLI 能否串联多个 Git 命令。
3. **批量文件操作**：通过 CLI 输入"找出项目中所有超过 100 行的 JS 文件并列出文件名和行数"，观察 CLI 如何生成并执行 Shell 命令。
4. **代码片段发送**：在编辑器中选中一段代码，右键选择 **Send to Copilot CLI**（或等效操作），在终端中对其提问"这段代码有什么潜在的性能问题？"。
5. **CLI 查看 PR 列表**：在终端通过 CLI 输入"列出 `llifangyin/gitHub-copilot-demo` 仓库最近 5 个 PR，包含状态和标题"，验证能否通过终端完成 GitHub 操作。

---

## 第十章：代码审查与 PR 工作流

### 1. Copilot Code Review

在 GitHub PR 页面，点击 **Request Review → Copilot** 即可触发 AI 代码审查。Copilot 会：
- 逐文件分析改动，标注潜在问题
- 给出具体的改进建议（附带修复代码片段）
- 识别常见问题：未处理的异常、N+1 查询、潜在的 null 引用、安全漏洞等

**审查结果的形式：** 与人工 Review 一样，以 PR Comment 的形式出现，每条建议都标注在对应的代码行上，可以直接 Reply 回复或点击 **Resolve** 标为已解决。

**VS Code 内触发：** 在 Chat 面板输入 `/review`，可以在本地提交前就获得 Copilot 的审查建议，更早发现问题。

### 2. 自动生成 PR Summary

在 GitHub 的 PR 描述编辑框中，点击顶部工具栏的 **Copilot** 图标（✨），Copilot 会自动分析本次 PR 的所有 commit 和 diff，生成包含以下内容的摘要：

- **变更目的**：这次 PR 解决了什么问题
- **影响文件**：列出主要改动的文件及其改动原因
- **测试覆盖**：是否有对应的测试改动
- **审查重点**：提示审查者需要重点关注的部分

> 💡 AI 生成的摘要可以作为初稿，修改后再提交，比从零手写效率高很多。

### 3. Agent Memory（跨会话记忆）

Agent Memory 让 Copilot 能够在不同会话之间保留关于你项目的背景知识：

**记忆的内容包括：**
- 你的项目技术栈和架构决策
- 曾经讨论并采纳的编码规范
- 反复出现的业务逻辑和领域术语
- 你的个人偏好（如倾向于某种代码风格）

**共享范围：** Copilot 编程代理、CLI 和 Code Review 三个场景共享同一份记忆，所以在 Chat 里告诉 Copilot"这个项目不使用 Redux"，Code Review 时它也会注意这条规则。

**管理记忆：** 在 Chat 中输入 `/memory` 可以查看和编辑 Copilot 对当前仓库的记忆内容。

### 实战练习题

> 将 AI 融入真实的 GitHub 协作流程，体验从写代码到合并 PR 的全链路辅助。

1. **触发 Code Review**：向 `github-copilot-demo` 仓库提交一个包含明显可改进代码的 PR（如缺少错误处理、变量命名不清），在 GitHub PR 页面找到 **Copilot Code Review** 按钮并启动，阅读 AI 给出的审查建议。
2. **响应审查建议**：根据 Copilot 的至少一条审查意见，在本地修改代码后重新 push，观察建议是否被标记为已解决。
3. **生成 PR Summary**：在 PR 描述编辑框中点击 **Copilot** 图标，让 Copilot 自动生成变更摘要（含修改目的、影响文件、注意事项），对比 AI 生成的摘要与你自己写的版本。
4. **跨会话记忆验证**：在完成项目某个功能后，关闭对话，重新开启一个新 Chat 会话，询问"这个项目之前我们给 utils.js 加了哪些函数？"，测试 Agent Memory 是否保留了上下文。
5. **完整 PR 工作流**：完整走一遍：写代码 → Copilot 辅助 Review → 修复问题 → 让 Copilot 生成 PR Summary → 合并 PR，记录整个过程中 Copilot 在哪些环节节省了你的时间。

---

## 第十一章：总结与最佳实践

### 各功能适用场景速查表

| 功能 | 适合场景 | 复杂度 |
|------|----------|--------|
| 内联补全 | 日常编码加速 | ⭐ |
| Inline Chat | 局部代码修改/解释 | ⭐⭐ |
| Copilot Chat | 问答、调试、生成测试 | ⭐⭐ |
| Edit Mode | 多文件可控修改 | ⭐⭐⭐ |
| Agent Mode | 复杂任务自动化 | ⭐⭐⭐⭐ |
| MCP 集成 | 连接外部系统 | ⭐⭐⭐⭐⭐ |

### 高效使用 Copilot 的 10 个习惯

1. 用清晰的注释描述意图，而非直接写代码
2. 善用 `@workspace` 提供更大上下文
3. 复杂任务先用 Plan Agent 规划再执行
4. 建立 `.github/copilot-instructions.md` 统一团队规范
5. 用 Prompt Files 积累高质量提示词
6. 对 Agent 输出保持审查意识，重要修改逐行确认
7. 多模型对比：不同任务选择最合适的模型
8. 结合 MCP 打通开发工具链（GitHub / Jira / Slack 等）
9. 用 Hooks 自动化质量检查，减少人工 Review 负担
10. 定期查阅 GitHub Copilot 更新日志，跟上新功能

### 常见坑与解决方案

| 问题 | 解决方案 |
|------|----------|
| 补全结果不准确 | 增加注释描述 + 提供更多上下文文件 |
| Agent 陷入循环 | 手动中断 + 用 Fork Conversation 重试 |
| MCP 连接失败 | 检查服务器 URL 和权限配置 |
| 自定义指令不生效 | 确认文件路径为 `.github/copilot-instructions.md` |

### 进阶资源推荐

- 📖 [GitHub Copilot 官方文档](https://docs.github.com/copilot)
- 🎥 GitHub Copilot YouTube 频道
- 💬 GitHub Community Discussions - Copilot 板块
- 🔧 VS Code Marketplace - Copilot 相关扩展

---

> 💡 **写作建议**：按章节顺序写，每章配截图 + 示例代码，最终 `github-copilot-demo` 仓库里会自然积累出覆盖所有功能的真实代码。

---

*最后更新：2026-03-25 | 基于 GitHub Copilot 最新版本整理*