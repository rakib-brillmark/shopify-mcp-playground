"use client"

import React from 'react'
import JsonViewer from "@/components/json-highlighter"
import { useState } from "react"

import { SearchShopCatalog } from "@/components/api-components/search-shop-catalog"
import { GetCart } from "@/components/api-components/get-cart"
import { UpdateCart } from "@/components/api-components/update-cart"
import { SearchPoliciesFaqs } from "@/components/api-components/search-policies-faqs"
import { GetProductDetails } from "@/components/api-components/get-product-details"
import { Button } from "@/components/ui/button"


const MCPToolComponents = () => {
  const [selectedApi, setSelectedApi] = useState<string>("search_shop_catalog")
  const [jsonResponse, setJsonResponse] = useState<any>(null)

  const apiEndpoints = [
    { id: "search_shop_catalog", label: "Search Shop Catalog" },
    { id: "get_cart", label: "Get Cart" },
    { id: "update_cart", label: "Update Cart" },
    { id: "search_shop_policies_and_faqs", label: "Search Policies & FAQs" },
    { id: "get_product_details", label: "Get Product Details" },
  ]

  const handleApiCall = async (apiId: string) => {
    setSelectedApi(apiId)
    // Removed automatic clearing of response when switching endpoints
    // setJsonResponse(null) // Clear previous response
  }

  const handleApiResponse = (data: any) => {
    setJsonResponse(data)
  }

  const renderApiComponent = () => {
    const componentProps = { onApiCall: handleApiResponse }

    switch (selectedApi) {
      case "search_shop_catalog":
        return <SearchShopCatalog {...componentProps} />
      case "get_cart":
        return <GetCart {...componentProps} />
      case "update_cart":
        return <UpdateCart {...componentProps} />
      case "search_shop_policies_and_faqs":
        return <SearchPoliciesFaqs {...componentProps} />
      case "get_product_details":
        return <GetProductDetails {...componentProps} />
      default:
        return null
    }
  }



  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Left Side - API Controls */}
      <div className="w-1/2 border-border p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">MCP Tools</h2>

          {/* API Buttons Row */}
          <div className="flex flex-wrap gap-2 min-h-[40px]">
            {apiEndpoints.map((endpoint) => (
              <Button
                key={endpoint.id}
                variant={selectedApi === endpoint.id ? "default" : "outline"}
                onClick={() => handleApiCall(endpoint.id)}
                className="text-sm whitespace-nowrap"
              >
                {endpoint.label}
              </Button>
            ))}
          </div>

          <div className="mt-6 min-h-[400px]">{renderApiComponent()}</div>
        </div>
      </div>

      {/* Right Side - JSON Response */}
      <div className="w-1/2 p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Response</h2>

          {jsonResponse ? (
            <JsonViewer data={jsonResponse} />
          ) : (
            <div className="flex items-center h-full text-muted-foreground">
              <p>Select an API endpoint and submit a request to see the response here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MCPToolComponents