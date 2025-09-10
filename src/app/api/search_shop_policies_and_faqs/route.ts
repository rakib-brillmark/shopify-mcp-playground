import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { shopUrl, query } = body

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
          name: "search_shop_policies_and_faqs",
          arguments: {
            query: query || "",
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
      message: "Search shop policies and FAQs completed successfully",
      data: formattedDataJson,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Failed to process search_shop_policies_and_faqs request",
        data: null,
      },
      { status: 500 },
    )
  }
}
