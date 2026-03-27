import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// 部署到子路径时请修改 base
export default defineConfig({
  base: './', // 如需部署到 /demo/，改为 '/demo/'
  plugins: [react()],
})
