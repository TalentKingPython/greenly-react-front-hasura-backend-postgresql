import React, { ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  FallbackComponent: React.ComponentType;
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error', error);
    console.log('Info: ', errorInfo);
    // TODO: log the error to an error reporting service
  }

  render() {
    if (this.state.hasError) {
      return <this.props.FallbackComponent />;
    }

    return <>{this.props.children}</>;
  }
}
