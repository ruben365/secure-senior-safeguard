import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  subtotal: number;
  discount?: number;
  total: number;
  className?: string;
}

export const OrderSummary = ({
  items,
  subtotal,
  discount = 0,
  total,
  className,
}: OrderSummaryProps) => {
  return (
    <Card className={`pay-card pay-card--summary border-0 ${className ?? ""}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShoppingCart className="w-5 h-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Items */}
        <div>
          {items.map((item, index) => (
            <div key={index} className="pay-card__row">
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <p className="font-medium tabular-nums">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Subtotal */}
        <div className="pay-card__row text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium tabular-nums">${subtotal.toFixed(2)}</span>
        </div>

        {/* Discount */}
        {discount > 0 && (
          <div className="pay-card__row text-sm text-green-600">
            <span>Discount</span>
            <span className="font-medium tabular-nums">-${discount.toFixed(2)}</span>
          </div>
        )}

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-baseline">
          <span className="text-base font-semibold">Total</span>
          <span className="pay-card__total text-xl">${total.toFixed(2)}</span>
        </div>

        {/* Security note */}
        <p className="text-xs text-muted-foreground text-center pt-2">
          🔒 Secure checkout powered by Stripe
        </p>
      </CardContent>
    </Card>
  );
};
