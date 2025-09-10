import { useTheme } from "next-themes"
import React from 'react'
import { Button } from "../ui/button"
import { LogOut, Moon, Settings, Sun } from "lucide-react"

type HeaderProps = {
  handleLogout: () => void
  handleConfigOpen: () => void
}

const Header = ({ handleConfigOpen, handleLogout }: HeaderProps) => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-foreground">API Playground</h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={handleConfigOpen} className="h-9 w-9">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Open config</span>
          </Button>

          <Button variant="ghost" size="icon" onClick={handleLogout} className="h-9 w-9">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header