"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SearchPoliciesFaqsProps {
  onApiCall: (data: any) => void
}

export function SearchPoliciesFaqs({ onApiCall }: SearchPoliciesFaqsProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/search_shop_policies_and_faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          shopUrl: localStorage.getItem("store_url")
        }),
      })
      const data = await response.json()
      onApiCall(data)
    } catch (error) {
      onApiCall({
        success: false,
        error: "Failed to search policies and FAQs",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Policies & FAQs</CardTitle>
        <CardDescription>Search through shop policies and frequently asked questions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">Search Query</Label>
            <Textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your search query..."
              rows={3}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Searching..." : "Search Policies & FAQs"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
