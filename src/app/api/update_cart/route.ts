import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { shopUrl, cartId, productId, quantity, action } = body

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
          name: "update_cart",
          arguments: {
            cart_id: cartId || "",
            product_id: productId || "",
            quantity: quantity || 1,
            action: action || "add",
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
      message: "Update cart completed successfully",
      data: formattedDataJson,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to process update_cart request",
        data: null,
      },
      { status: 500 },
    )
  }
}
