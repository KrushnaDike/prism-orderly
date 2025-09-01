"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"

export function TableInput() {
  const { state, setTableNumber } = useCart()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const t = params.get("table")
    if (t && !state.tableNumber) {
      setTableNumber(t)
    }
  }, [setTableNumber, state.tableNumber])

  return (
    <div className="space-y-2">
      <Label htmlFor="table" className="text-sm font-medium">
        Table number
      </Label>
      <Input
        id="table"
        type="tel"
        inputMode="numeric"
        placeholder="Enter your table number"
        value={state.tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        className="h-11"
      />
    </div>
  )
}
