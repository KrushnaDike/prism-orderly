"use client"

import { useMemo, useState } from "react"
import { categories, menu } from "@/components/menu-data"
import { MenuItemCard } from "@/components/menu-item-card"
import { TableInput } from "@/components/table-input"
import { CartBar } from "@/components/cart-bar"
import { OrderSheet } from "@/components/order-sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Page() {
  const [active, setActive] = useState<string>(categories[0].id)
  const [reviewOpen, setReviewOpen] = useState(false)

  const filtered = useMemo(() => menu.filter((m) => m.category === active), [active])

  return (
    <main className="mx-auto min-h-dvh max-w-xl">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-balance">Royal Maratha</h1>
              <p className="text-xs text-muted-foreground">Dine-in QR Ordering</p>
            </div>
            <Button
              variant="outline"
              className="h-9 text-emerald-700 border-emerald-200 bg-transparent"
              onClick={() => setReviewOpen(true)}
            >
              View Cart
            </Button>
          </div>
          <div className="mt-3">
            <TableInput />
          </div>
        </div>
        <nav className="no-scrollbar -mb-px flex gap-2 overflow-x-auto px-4 pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              className={cn(
                "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm",
                active === c.id ? "bg-emerald-600 text-white border-emerald-600" : "hover:bg-muted",
              )}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </nav>
      </header>

      <section className="px-4 py-4">
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Hint to scroll categories */}
        <p className="mt-6 text-center text-xs text-muted-foreground">Browse other categories above</p>
      </section>

      <CartBar onReview={() => setReviewOpen(true)} />
      <OrderSheet open={reviewOpen} onOpenChange={setReviewOpen} />
      <footer className="h-24" />
    </main>
  )
}
