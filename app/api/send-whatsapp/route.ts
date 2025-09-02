import { NextResponse } from "next/server"
import { buildWhatsAppMessage } from "@/lib/format"

// Expected env vars for automatic sending (WhatsApp Cloud API)
// WHATSAPP_TOKEN
// WHATSAPP_PHONE_NUMBER_ID
// RESTAURANT_WHATSAPP_NUMBER  (E.164 format, e.g., 9198XXXXXXXX)
// Optional client-side var for wa.me fallback:
// NEXT_PUBLIC_RESTAURANT_WHATSAPP

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      restaurantName,
      tableNumber,
      items,
    }: {
      restaurantName: string
      tableNumber?: string
      items: { id: string; qty: number; price: number; name: string }[]
    } = body

    // Build message text
    const lines = items.map((i) => ({
      item: { id: i.id, name: i.name, price: i.price } as any,
      qty: i.qty,
    }))
    const message = buildWhatsAppMessage({
      restaurantName,
      tableNumber,
      lines,
    })

    const token = process.env.WHATSAPP_TOKEN
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID
    const toNumber = process.env.RESTAURANT_WHATSAPP_NUMBER

    if (token && phoneId && toNumber) {
      // Send via WhatsApp Business Cloud API
      const resp = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: toNumber,
          type: "text",
          text: { body: message },
        }),
      })

      if (!resp.ok) {
        const err = await resp.text()
        return NextResponse.json({ error: "WhatsApp API error", details: err }, { status: 500 })
      }
      return NextResponse.json({ sent: true })
    }

    // Fallback: build wa.me link (user taps send)
    const link = `https://wa.me/${9529672277}?text=${encodeURIComponent(message)}`
    return NextResponse.json({ link })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 400 })
  }
}
