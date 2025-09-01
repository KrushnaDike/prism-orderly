"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/hooks/use-cart";
import { formatINR } from "@/lib/format";
import { useToast } from "@/hooks/use-toast";

const RESTAURANT_NAME = "Royal Maratha";

export function OrderSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { state, total, increment, decrement, remove, clear } = useCart();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const placeOrder = async () => {
    if (state.items.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurantName: RESTAURANT_NAME,
          tableNumber: state.tableNumber,
          items: state.items,
          total,
        }),
      });
      const data = await res.json();
      if (data?.link) {
        // Fall back to wa.me
        window.open(data.link as string, "_blank", "noopener,noreferrer");
        toast({ title: "Open WhatsApp to send your order" });
      } else if (data?.sent) {
        toast({ title: "Order sent to restaurant via WhatsApp" });
      } else {
        toast({ title: "Could not send automatically. Opening WhatsApp…" });
        if (data?.fallback) window.open(data.fallback, "_blank");
      }
      clear();
      onOpenChange(false);
    } catch (err: unknown) {
      const error = err as Error;
      toast({
        title: "Something went wrong",
        description: error.message ?? "Please try again",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-balance">Review your order</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="rounded-lg border">
            {state.items.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">
                Your cart is empty.
              </p>
            ) : (
              <ul className="divide-y">
                {state.items.map((i) => (
                  <li
                    key={i.id}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{i.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatINR(i.price)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => decrement(i.id)}
                        aria-label={`Decrease ${i.name}`}
                      >
                        -
                      </Button>
                      <span className="w-6 text-center">{i.qty}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => increment(i.id)}
                        aria-label={`Increase ${i.name}`}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => remove(i.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Table</p>
              <p className="font-semibold">{state.tableNumber || "Not set"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-semibold">{formatINR(total)}</p>
            </div>
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Continue ordering
          </Button>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            onClick={placeOrder}
            disabled={state.items.length === 0 || submitting}
          >
            {submitting ? "Sending…" : "Send order on WhatsApp"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
