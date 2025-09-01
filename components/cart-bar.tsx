"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { formatINR } from "@/lib/format"
import { ShoppingCart } from "lucide-react"

export function CartBar({ onReview }: { onReview: () => void }) {
  const { state, total } = useCart()
  const count = state.items.reduce((sum, i) => sum + i.qty, 0)

  if (count === 0) return null

  return (
    <div className="fixed inset-x-0 bottom-0 mx-auto max-w-xl px-4 pb-4">
      <div className="rounded-xl border bg-background shadow-lg">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-emerald-600" />
            <span className="text-sm">
              {count} item{count > 1 ? "s" : ""} • <span className="font-semibold">{formatINR(total)}</span>
            </span>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onReview}>
            Review order
          </Button>
        </div>
      </div>
    </div>
  )
}
