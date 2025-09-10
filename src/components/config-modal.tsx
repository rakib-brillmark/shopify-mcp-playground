"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ConfigModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isRequired?: boolean
}

export function ConfigModal({ open, onOpenChange, isRequired = false }: ConfigModalProps) {
  const [storeUrl, setStoreUrl] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load values from localStorage when modal opens
  useEffect(() => {
    if (open) {
      const savedStoreUrl = localStorage.getItem("store_url") || ""
      setStoreUrl(savedStoreUrl)
      setSaveSuccess(false)
    }
  }, [open])

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate a brief saving state
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Save to localStorage
    localStorage.setItem("store_url", storeUrl)

    setIsSaving(false)
    setSaveSuccess(true)

    // Auto-close after showing success
    setTimeout(() => {
      onOpenChange(false)
    }, 1000)
  }

  const handleCancel = () => {
    if (isRequired && (!storeUrl.trim())) {
      return
    }

    // Reset to saved values
    const savedStoreUrl = localStorage.getItem("store_url") || ""
    setStoreUrl(savedStoreUrl)
    setSaveSuccess(false)
    onOpenChange(false)
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && isRequired && (!storeUrl.trim())) {
      return
    }
    onOpenChange(newOpen)
  }

  const isFormValid = storeUrl.trim()

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isRequired ? "Configuration Required" : "Configuration"}</DialogTitle>
          <DialogDescription>
            {isRequired
              ? "Please configure your API settings to continue. These values will be stored locally in your browser."
              : "Configure your API settings. These values will be stored locally in your browser."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {isRequired && (
            <Alert className="border-orange-200 bg-orange-50 text-orange-800 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-200">
              <AlertDescription>Store URL is required to use the API playground.</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="store-url">Store URL *</Label>
            <Input
              id="store-url"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="https://your-store.example.com"
              type="url"
              required
            />
          </div>

          {saveSuccess && (
            <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
              <AlertDescription>Configuration saved successfully!</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          {!isRequired && (
            <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving || !isFormValid}>
            {isSaving ? "Saving..." : "Save Configuration"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
