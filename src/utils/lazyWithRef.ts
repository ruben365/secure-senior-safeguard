import { lazy, forwardRef, ComponentType } from "react";

/**
 * Wrapper around React.lazy that auto-wraps the resolved component
 * with forwardRef to prevent "Function components cannot be given refs" warnings.
 */
export function lazyWithRef(
  factory: () => Promise<{ default: ComponentType<any> }>
) {
  const LazyComponent = lazy(factory);
  const Wrapped = forwardRef(function LazyForwardRef(props: any, ref: any) {
    return <LazyComponent {...props} ref={ref} />;
  });
  Wrapped.displayName = "LazyWithRef";
  return Wrapped;
}
