import { createContext, useContext, useState, ReactNode } from "react";

interface CartFeedbackContextType {
  showThankYou: boolean;
  triggerThankYou: () => void;
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
    setShowThankYou(false);
    setShowEmptyCartHelp(true);
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
        showEmptyCartHelp,
        triggerEmptyCartHelp,
        dismissAll,
      }}
    >
      {children}
    </CartFeedbackContext.Provider>
  );
};
