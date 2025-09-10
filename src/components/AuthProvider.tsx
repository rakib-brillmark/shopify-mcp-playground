"use client"

import React, { Suspense, useEffect, useState } from 'react'
import { ThemeProvider } from "./theme-provider"
import { ConfigModal } from "./config-modal"
import { PasswordProtection } from "./password-protection"
import Header from "./modules/Header"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showConfig, setShowConfig] = useState(false)
  const [isConfigRequired, setIsConfigRequired] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    const authFlag = localStorage.getItem("api-playground-auth")
    if (authFlag === "true") {
      setIsAuthenticated(true)

      const storeUrl = localStorage.getItem("store_url")

      if (!storeUrl) {
        setIsConfigRequired(true)
        setShowConfig(true)
      }
    }
    setIsLoading(false)
  }, [])

  const handleAuthenticated = () => {
    setIsAuthenticated(true)

    const storeUrl = localStorage.getItem("store_url")

    if (!storeUrl) {
      setIsConfigRequired(true)
      setShowConfig(true)
    }
  }

  const handleConfigClose = (open: boolean) => {
    if (!open && isConfigRequired) {
      const storeUrl = localStorage.getItem("store_url")

      if (storeUrl) {
        setIsConfigRequired(false)
        setShowConfig(false)
      }
      // Don't close if config is still required
    } else {
      setShowConfig(open)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("api-playground-auth")
    setIsAuthenticated(false)
  }

  const handleConfigOpen = () => {
    setShowConfig(true)
  }


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <PasswordProtection onAuthenticated={handleAuthenticated} />
  }

  return (
    <Suspense fallback={null}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <Header handleConfigOpen={handleConfigOpen} handleLogout={handleLogout} />
        {children}
        <ConfigModal open={showConfig} onOpenChange={handleConfigClose} isRequired={isConfigRequired} />
      </ThemeProvider>
    </Suspense>
  )
}

export default AuthProvider