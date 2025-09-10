"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GetCartProps {
  onApiCall: (data: any) => void
}

export function GetCart({ onApiCall }: GetCartProps) {
  const [cartId, setCartId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/get_cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId,
          shopUrl: localStorage.getItem("store_url")
        }),
      })
      const data = await response.json()
      onApiCall(data)
    } catch (error) {
      onApiCall({
        success: false,
        error: "Failed to get cart",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Cart</CardTitle>
        <CardDescription>Retrieve cart contents using cart ID</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cartId">Cart ID</Label>
            <Input
              id="cartId"
              value={cartId}
              onChange={(e) => setCartId(e.target.value)}
              placeholder="Enter cart ID..."
              required
            />
          </div>

          <Button type="submit" disabled={isLoading || !cartId} className="w-full">
            {isLoading ? "Getting Cart..." : "Get Cart"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
