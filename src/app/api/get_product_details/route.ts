import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { shopUrl, productId } = body

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
          name: "get_product_details",
          arguments: {
            product_id: productId || "",
          },
        },
      }),
    })

    const data = await res.json()

    const { result } = data
    const formattedData = result?.content[0]?.text || "{}"
    const formattedDataJson = JSON.parse(formattedData)

    return NextResponse.json({
      error: null,
      message: "Get product details completed successfully",
      data: formattedDataJson,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to process get_product_details request",
        data: null,
      },
      { status: 500 },
    )
  }
}
