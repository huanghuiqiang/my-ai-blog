"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// 这是一个包装器，把 next-themes 的功能封装一下
// { children, ...props } 是 React 组件的标准写法，表示“接收所有内容和属性”
export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}