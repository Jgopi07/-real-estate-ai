import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Support Vercel deployment (base '/') and GitHub Pages (base '/-real-estate-ai/')
const isVercel = process.env.VERCEL && (process.env.VERCEL.trim() === '1' || process.env.VERCEL.trim() === 'true');
const base = isVercel ? '/' : '/-real-estate-ai/';

export default defineConfig({
  base: base,
  plugins: [react()],
})
