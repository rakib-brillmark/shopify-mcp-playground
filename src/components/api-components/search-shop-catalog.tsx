"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import ProductTable from "../modules/ProductTable"

interface SearchShopCatalogProps {
  onApiCall: (data: any) => void
}

export function SearchShopCatalog({ onApiCall }: SearchShopCatalogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>(null)

  const schema = z.object({
    query: z.string().min(1, "Search query is required"),
    context: z.string().optional(),
  priceMin: z.preprocess(val => val === "" ? undefined : Number(val), z.number().optional()),
  priceMax: z.preprocess(val => val === "" ? undefined : Number(val), z.number().optional()),
    variantOptionName: z.string().optional(),
    variantOptionValue: z.string().optional(),
    brand: z.string().optional(),
  })

  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      query: "",
      context: "",
      priceMin: undefined,
      priceMax: undefined,
      variantOptionName: "",
      variantOptionValue: "",
      brand: "",
    },
  })

  useEffect(() => {
    console.log(data);
  }, [data])

  const onSubmit = async (formData: FormValues) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/search_shop_catalog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: formData.query,
          context: formData.context,
          priceMin: formData.priceMin,
          priceMax: formData.priceMax,
          variantOptionName: formData.variantOptionName,
          variantOptionValue: formData.variantOptionValue,
          brand: formData.brand,
          shopUrl: localStorage.getItem("store_url"),
        }),
      })
      const data = await response.json()
      onApiCall(data)
      setData(data.data.products || null)
      reset()
    } catch (error) {
      onApiCall({
        success: false,
        error: "Failed to search catalog",
        details: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Search Shop Catalog</CardTitle>
          <CardDescription>Search for products in the shop catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="query">Search Query</Label>
              <Textarea
                id="query"
                {...register("query")}
                placeholder="Enter search terms..."
                required
                rows={3}
              />
              {errors.query && (
                <span className="text-red-500 text-sm">{errors.query.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">Context (Optional)</Label>
              <Textarea
                id="context"
                {...register("context")}
                placeholder="Provide additional context for the search..."
                rows={3}
              />
              {errors.context && (
                <span className="text-red-500 text-sm">{errors.context.message}</span>
              )}
            </div>

            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter by price, variant, brand etc.</CardDescription>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceMin">Price Min</Label>
                  <input
                    id="priceMin"
                    type="number"
                    step="any"
                    {...register("priceMin")}
                    className="input w-full border rounded px-2 py-1"
                    placeholder="Minimum price"
                  />
                  {errors.priceMin && (
                    <span className="text-red-500 text-sm">{errors.priceMin.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceMax">Price Max</Label>
                  <input
                    id="priceMax"
                    type="number"
                    step="any"
                    {...register("priceMax")}
                    className="input w-full border rounded px-2 py-1"
                    placeholder="Maximum price"
                  />
                  {errors.priceMax && (
                    <span className="text-red-500 text-sm">{errors.priceMax.message}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="space-y-2">
                  <Label>Variant Option Name</Label>
                  <input
                    id="variantOptionName"
                    type="text"
                    {...register("variantOptionName")}
                    className="input w-full border rounded px-2 py-1"
                    placeholder="Option name"
                  />
                  {errors.variantOptionName && (
                    <span className="text-red-500 text-sm">{errors.variantOptionName.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Variant Option Value</Label>
                  <input
                    id="variantOptionValue"
                    type="text"
                    {...register("variantOptionValue")}
                    className="input w-full border rounded px-2 py-1"
                    placeholder="Option value"
                  />
                  {errors.variantOptionValue && (
                    <span className="text-red-500 text-sm">{errors.variantOptionValue.message}</span>
                  )}
                </div>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="brand">Brand</Label>
                <input
                  id="brand"
                  type="text"
                  {...register("brand")}
                  className="input w-full border rounded px-2 py-1"
                  placeholder="Brand name"
                />
                {errors.brand && (
                  <span className="text-red-500 text-sm">{errors.brand.message}</span>
                )}
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Searching..." : "Search Catalog"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div className="mt-6">
        <ProductTable data={data} />
      </div>
    </>
  )
}
