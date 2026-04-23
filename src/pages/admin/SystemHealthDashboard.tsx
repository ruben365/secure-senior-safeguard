import { Component, type ErrorInfo, type ReactNode, useState } from "react";
import SuperAdminDashboardHealth from "@/components/admin/super/SuperAdminDashboardHealth";
import SuperAdminActivityFeed from "@/components/admin/super/SuperAdminActivityFeed";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class SystemHealthErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("SystemHealthDashboard error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-4 max-w-7xl mx-auto">
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
              <h2 className="text-lg font-semibold text-red-400 mb-2">
                Failed to load System Health Dashboard
              </h2>
              <p className="text-sm text-[#9CA3AF] mb-4">
                {this.state.error?.message || "An unexpected error occurred."}
              </p>
              <button
                className="px-4 py-2 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors text-sm"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default function SystemHealthDashboard() {
  return (
    <SystemHealthErrorBoundary>
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#F9FAFB]">
            System Health & Monitoring
          </h1>
          <p className="text-[#9CA3AF]">
            Monitor backend services and platform activity
          </p>
        </div>
        <div className="space-y-4">
          <SuperAdminDashboardHealth />
          <SuperAdminActivityFeed />
        </div>
      </div>
    </SystemHealthErrorBoundary>
  );
}
