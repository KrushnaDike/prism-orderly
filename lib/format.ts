import type { MenuItem } from "@/components/menu-data"

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)

export type OrderLine = { item: MenuItem; qty: number }
export function buildWhatsAppMessage(params: {
  restaurantName: string
  tableNumber?: string
  lines: OrderLine[]
}) {
  const { restaurantName, tableNumber, lines } = params
  const total = lines.reduce((sum, l) => sum + l.item.price * l.qty, 0)
  const header = `${restaurantName}\nTable: ${tableNumber?.trim() || "N/A"}`
  const body = lines.map((l) => `* ${l.qty} x ${l.item.name} — ${formatINR(l.item.price * l.qty)}`).join("\n")
  const footer = `Total: ${formatINR(total)}`
  return `${header}\n${body}\n${footer}`
}
