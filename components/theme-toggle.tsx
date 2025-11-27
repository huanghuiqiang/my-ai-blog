"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // IT 知识点: useEffect (处理水合问题)
  // 因为服务器不知道用户的浏览器是啥主题，所以为了避免"服务器渲染了亮色，
  // 浏览器里闪一下变成暗色"的诡异效果，我们先确保组件已经"挂载(mounted)"到了浏览器上，再显示按钮。
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="h-6 w-6 text-yellow-500" />
      ) : (
        <Moon className="h-6 w-6 text-slate-700" />
      )}
    </button>
  )
}