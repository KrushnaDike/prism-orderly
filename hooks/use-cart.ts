"use client"

import useSWR from "swr"
import type { MenuItem } from "@/components/menu-data"

type CartItem = { id: string; qty: number; price: number; name: string }
type CartState = {
  items: CartItem[]
  tableNumber: string
}

const KEY = "cart-v1"

function load(): CartState {
  if (typeof window === "undefined") return { items: [], tableNumber: "" }
  const raw = window.localStorage.getItem(KEY)
  if (!raw) return { items: [], tableNumber: "" }
  try {
    const parsed = JSON.parse(raw)
    if (!parsed?.items) return { items: [], tableNumber: "" }
    return parsed
  } catch {
    return { items: [], tableNumber: "" }
  }
}

function save(state: CartState) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(KEY, JSON.stringify(state))
}

export function useCart() {
  const { data, mutate } = useSWR<CartState>(KEY, async () => load(), {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  })

  const state: CartState = data || { items: [], tableNumber: "" }

  const set = (updater: (prev: CartState) => CartState) => {
    const next = updater(state)
    save(next)
    void mutate(next, false)
  }

  const setTableNumber = (tableNumber: string) => {
    set((prev) => ({ ...prev, tableNumber }))
  }

  const addItem = (item: MenuItem) => {
    set((prev) => {
      const existing = prev.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          ...prev,
          items: prev.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i)),
        }
      }
      return {
        ...prev,
        items: [...prev.items, { id: item.id, qty: 1, price: item.price, name: item.name }],
      }
    })
  }

  const increment = (id: string) => {
    set((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    }))
  }

  const decrement = (id: string) => {
    set((prev) => ({
      ...prev,
      items: prev.items.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0),
    }))
  }

  const remove = (id: string) => {
    set((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }))
  }

  const clear = () => set(() => ({ items: [], tableNumber: state.tableNumber }))

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return {
    state,
    setTableNumber,
    addItem,
    increment,
    decrement,
    remove,
    clear,
    total,
  }
}
