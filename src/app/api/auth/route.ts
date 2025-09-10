import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Server-side password validation
    const VALID_PASSWORD = "12345"

    if (password === VALID_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: "Authentication successful",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication failed",
      },
      { status: 500 },
    )
  }
}
