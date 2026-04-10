import { Button } from "@/components/ui/button";
import {
  ShoppingCart as CartIcon,
  Trash2,
  Plus,
  Minus,
  X,
  Lock,
  BookOpen,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
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
          className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors relative"
          aria-label={`Shopping cart, ${itemCount} items`}
        >
          <CartIcon className="w-4 h-4" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-orange-500 rounded-full leading-none shadow-[0_0_8px_rgba(249,115,22,0.45)]">
              {itemCount}
            </span>
          )}
        </button>

        {/* Dropdown / Slide-in panel */}
        {open && (
          <>
            <div className="fixed inset-0 z-40 bg-black/20 sm:bg-transparent" onClick={() => setOpen(false)} />

            {/* Desktop: absolute dropdown. Mobile: fixed right-side panel */}
            <div
              className="
                sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-[320px] sm:rounded-xl
                fixed right-0 top-0 z-50 sm:h-auto
                w-[min(80%,280px)] sm:w-[320px]
                rounded-l-xl sm:rounded-xl
                overflow-hidden border border-white/10
                shadow-[0_20px_60px_rgba(0,0,0,0.5)]
              "
              style={{
                background: "rgba(15, 15, 20, 0.95)",
                backdropFilter: "blur(20px) saturate(120%)",
                WebkitBackdropFilter: "blur(20px) saturate(120%)",
                height: "auto",
                maxHeight: "80vh",
              }}
            >
              {/* Inner wrapper — capped height, scrollable items, sticky footer */}
              <div className="flex flex-col max-h-[80vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/8 flex-shrink-0">
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
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Close cart"
                  >
                    <X className="w-[18px] h-[18px]" />
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  {items.length === 0 ? (
                    <div className="px-3 py-10 text-center">
                      <CartIcon className="w-6 h-6 text-white/30 mx-auto mb-2" />
                      <p className="text-[14px] text-white/60 mb-3">Your cart is empty</p>
                      <Link
                        to="/resources"
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        Browse Resources
                      </Link>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div key={item.id} className="px-3 sm:px-4 py-2 sm:py-3 border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors">
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" loading="lazy" decoding="async" width={40} height={40} />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[13px] font-medium text-white line-clamp-2 leading-snug">{item.name}</h4>
                            <p className="text-[12px] text-[#d96c4a] font-medium mt-0.5">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.08] border-[1.5px] border-white/30 text-white text-[14px] font-semibold hover:bg-white/[0.15] hover:border-white/50 transition-colors"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-[14px] font-semibold text-white">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-md bg-white/[0.08] border-[1.5px] border-white/30 text-white text-[14px] font-semibold hover:bg-white/[0.15] hover:border-white/50 transition-colors"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 flex items-center justify-center rounded-md text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-0.5"
                              aria-label="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-white/8 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[12px] text-white/60">Total</span>
                      <span className="text-[16px] font-bold text-white">${total.toFixed(2)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setOpen(false); setCheckoutOpen(true); }}
                      className="w-full h-[38px] flex items-center justify-center gap-2 rounded-lg text-white text-[14px] font-semibold transition-colors"
                      style={{ background: "linear-gradient(135deg, #ea580c, #c2410c)" }}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      Checkout
                    </button>
                  </div>
                )}
              </div>
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
