import { createContext, useContext, useState, ReactNode } from "react";

interface CartFeedbackContextType {
  showThankYou: boolean;
  triggerThankYou: () => void;
  dismissThankYou: () => void;
  showEmptyCartHelp: boolean;
  triggerEmptyCartHelp: () => void;
  dismissAll: () => void;
}

const CartFeedbackContext = createContext<CartFeedbackContextType | null>(null);

export const useCartFeedback = () => {
  const context = useContext(CartFeedbackContext);
  if (!context) {
    throw new Error("useCartFeedback must be used within CartFeedbackProvider");
  }
  return context;
};

const EMPTY_CART_DISMISSED_KEY = "empty_cart_help_dismissed";
const CART_ABANDON_SHOWN_KEY = "cart-abandon-shown";

export const CartFeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showEmptyCartHelp, setShowEmptyCartHelp] = useState(false);

  const triggerThankYou = () => {
    setShowEmptyCartHelp(false);
    setShowThankYou(true);
    // Auto-dismiss after 8 seconds
    setTimeout(() => setShowThankYou(false), 8000);
  };

  const triggerEmptyCartHelp = () => {
    if (sessionStorage.getItem(EMPTY_CART_DISMISSED_KEY) === "true") return;
    if (sessionStorage.getItem(CART_ABANDON_SHOWN_KEY)) return;
    sessionStorage.setItem(CART_ABANDON_SHOWN_KEY, "1");
    setShowThankYou(false);
    setShowEmptyCartHelp(true);
  };

  const dismissThankYou = () => {
    setShowThankYou(false);
  };

  const dismissAll = () => {
    setShowThankYou(false);
    setShowEmptyCartHelp(false);
    sessionStorage.setItem(EMPTY_CART_DISMISSED_KEY, "true");
  };

  return (
    <CartFeedbackContext.Provider
      value={{
        showThankYou,
        triggerThankYou,
        dismissThankYou,
        showEmptyCartHelp,
        triggerEmptyCartHelp,
        dismissAll,
      }}
    >
      {children}
    </CartFeedbackContext.Provider>
  );
};
