import { Button } from "@/components/ui/button";
import {
  ShoppingCart as CartIcon,
  Trash2,
  Plus,
  Minus,
  X,
  Lock,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, lazy, Suspense } from "react";
const EnhancedCheckoutDialog = lazy(() => import("./EnhancedCheckoutDialog").then(m => ({ default: m.EnhancedCheckoutDialog })));

export function ShoppingCart() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative">
        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center min-w-[44px] min-h-[44px] w-9 h-9 rounded-full bg-black/20 backdrop-blur-[8px] border border-white/15 hover:border-white/30 text-white/70 hover:text-white transition-all relative"
          aria-label={`Shopping cart, ${itemCount} items`}
        >
          <CartIcon className="w-4 h-4" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-orange-500 rounded-full leading-none shadow-[0_0_8px_rgba(249,115,22,0.45)]">
              {itemCount}
            </span>
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div
              className="absolute right-0 top-full mt-2 z-50 w-[min(320px,calc(100vw-2rem))] rounded-xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-sm:fixed max-sm:right-4 max-sm:top-16 max-sm:mt-0"
              style={{
                background: "rgba(15, 15, 20, 0.92)",
                backdropFilter: "blur(20px) saturate(120%)",
                WebkitBackdropFilter: "blur(20px) saturate(120%)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <CartIcon className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold text-white">Cart</span>
                  {itemCount > 0 && (
                    <span className="text-[10px] font-bold text-orange-300 bg-orange-500/20 px-1.5 py-0.5 rounded-full">
                      {itemCount}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-400 hover:text-white rounded-md hover:bg-white/8 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Items */}
              <div className="max-h-64 overflow-y-auto overscroll-contain">
                {items.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <CartIcon className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="px-4 py-3 border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                      <div className="flex items-start gap-3">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" loading="lazy" decoding="async" width={40} height={40} />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                          <p className="text-xs text-orange-400 font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-5 text-center text-xs font-medium text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="w-6 h-6 flex items-center justify-center rounded text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-1"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="px-4 py-3 border-t border-white/8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Total</span>
                    <span className="text-base font-bold text-white">${total.toFixed(2)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); setCheckoutOpen(true); }}
                    className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {checkoutOpen && (
        <Suspense fallback={null}>
          <EnhancedCheckoutDialog
            open={checkoutOpen}
            onOpenChange={setCheckoutOpen}
          />
        </Suspense>
      )}
    </>
  );
}
