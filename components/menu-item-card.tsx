"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { formatINR } from "@/lib/format";
import type { MenuItem } from "./menu-data";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export function MenuItemCard({ item }: { item: MenuItem }) {
  const { state, addItem, increment, decrement } = useCart();
  const inCart = state.items.find((i) => i.id === item.id);
  const qty = inCart?.qty || 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Image
          src={`/dish.png?height=200&width=320&query=${encodeURIComponent(
            item.imgQuery || item.name
          )}`}
          alt={item.name}
          className="h-40 w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-balance">
              {item.name}
            </h3>
            {item.desc ? (
              <p className="mt-1 text-sm text-muted-foreground text-pretty">
                {item.desc}
              </p>
            ) : null}
            <div className="mt-2 text-emerald-600 font-medium">
              {formatINR(item.price)}
            </div>
          </div>
          <div className="shrink-0">
            {qty === 0 ? (
              <Button
                className="h-10 px-4 bg-emerald-600 hover:bg-emerald-700"
                onClick={() => addItem(item)}
              >
                Add
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="h-10 w-10 bg-transparent"
                  onClick={() => decrement(item.id)}
                  aria-label={`Decrease ${item.name}`}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center font-medium">{qty}</span>
                <Button
                  variant="outline"
                  className="h-10 w-10 bg-transparent"
                  onClick={() => increment(item.id)}
                  aria-label={`Increase ${item.name}`}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
