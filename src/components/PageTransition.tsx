import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset visibility on route change
    setIsVisible(false);
    
    // Trigger fade-in after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      className="page-transition"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1500ms cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'opacity',
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
