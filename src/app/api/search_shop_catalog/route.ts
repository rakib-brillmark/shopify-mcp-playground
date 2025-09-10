import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { shopUrl, query, context, priceMin, priceMax, variantOptionName, variantOptionValue, brand } = body
    const filters = []

    if (priceMin != 0 && priceMax != 0) {
      filters.push({ price: { min: priceMin, max: priceMax } })
    } else {
      if (priceMin != 0) {
        filters.push({ price: { min: priceMin } })
      }
      if (priceMax != 0) {
        filters.push({ price: { max: priceMax } })
      }
    }
    if (variantOptionName && variantOptionValue) {
      filters.push({ variantOption: { name: variantOptionName, value: variantOptionValue } })
    }
    if (brand) {
      filters.push({ productVendor: brand })
    }

    console.log(filters);

    if (!shopUrl) {
      return NextResponse.json(
        {
          error: "Missing shopUrl in request",
          message: "Configuration required",
          data: null,
        },
        { status: 400 },
      )
    }

    const res = await fetch(`${shopUrl}/api/mcp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "tools/call",
        id: 2,
        params: {
          name: "search_shop_catalog",
          arguments: {
            query: query || "",
            context: context || "",
            filters: filters,
          },
        },
      }),
    })

    const data = await res.json()


    // // second call with the context
    // const res2 = await fetch(`${shopUrl}/api/mcp`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     jsonrpc: "2.0",
    //     method: "tools/call",
    //     id: 2,
    //     params: {
    //       name: "search_shop_catalog",
    //       arguments: {
    //         query: query || "",
    //         context: "",
    //         filters: [
    //           { price: { max: 20.00 } }
    //         ],
    //       },
    //     },
    //   }),
    // })

    // const data2 = await res2.json()

    const { result } = data;
    const formattedData = result?.content[0]?.text || "{}";
    const formattedDataJson = JSON.parse(formattedData);

    return NextResponse.json({
      error: null,
      message: "Search shop catalog completed successfully",
      data: formattedDataJson,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to process search_shop_catalog request",
        data: null,
      },
      { status: 500 },
    )
  }
}
