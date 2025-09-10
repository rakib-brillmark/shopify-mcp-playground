"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface GetProductDetailsProps {
  onApiCall: (data: any) => void
}

export function GetProductDetails({ onApiCall }: GetProductDetailsProps) {
  const [productId, setProductId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/get_product_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          shopUrl: localStorage.getItem("store_url")
        }),
      })
      const data = await response.json()
      onApiCall(data)
    } catch (error) {
      onApiCall({
        success: false,
        error: "Failed to get product details",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Product Details</CardTitle>
        <CardDescription>Retrieve detailed information about a specific product</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productId">Product ID</Label>
            <Input
              id="productId"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter product ID..."
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Getting Details..." : "Get Product Details"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
