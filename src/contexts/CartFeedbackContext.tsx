import { createContext, useContext, useState, ReactNode } from "react";

const DISMISSED_KEY = "cart_help_dismissed";

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

export const CartFeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [showEmptyCartHelp, setShowEmptyCartHelp] = useState(false);

  const triggerThankYou = () => {
    setShowEmptyCartHelp(false);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 8000);
  };

  const triggerEmptyCartHelp = () => {
    // Don't show if user already dismissed this session
    try {
      if (sessionStorage.getItem(DISMISSED_KEY) === "true") return;
    } catch {}
    setShowThankYou(false);
    setShowEmptyCartHelp(true);
  };

  const dismissAll = () => {
    setShowThankYou(false);
    setShowEmptyCartHelp(false);
    // Persist dismissal for this session
    try {
      sessionStorage.setItem(DISMISSED_KEY, "true");
    } catch {}
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
