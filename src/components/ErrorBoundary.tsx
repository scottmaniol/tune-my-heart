import { Component, ErrorInfo, ReactNode } from 'react';
import { BookOpen, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackType?: 'full' | 'inline';
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Here you could send to error reporting service (Sentry, LogRocket, etc.)
    // Example: logErrorToService(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      const { fallbackType = 'full' } = this.props;

      // Inline error (for component-level boundaries)
      if (fallbackType === 'inline') {
        return (
          <div className="card bg-red-50 border-2 border-red-200">
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-heading text-red-800 mb-2">
                Something Went Wrong
              </h3>
              <p className="text-sm text-red-700 font-body mb-4">
                This section encountered an error. Please try refreshing the page.
              </p>
              <button
                onClick={this.handleReset}
                className="btn-secondary text-sm"
              >
                <RefreshCw className="w-4 h-4 inline-block mr-2" />
                Try Again
              </button>
            </div>
          </div>
        );
      }

      // Full-page error (for app-level boundary)
      return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full">
            <div className="text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <BookOpen className="w-10 h-10 text-red-600" />
              </div>

              {/* Heading */}
              <h1 className="text-3xl font-heading text-gray-800 mb-3">
                An Unexpected Error Occurred
              </h1>

              {/* Message */}
              <p className="text-gray-600 font-body mb-6 leading-relaxed">
                We apologize for the interruption. The application encountered an error 
                and could not continue. Your data has been preserved, and you can safely 
                return to the homepage.
              </p>

              {/* Error Details (collapsed by default in production) */}
              {import.meta.env.DEV && this.state.error && (
                <details className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                  <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2">
                    Technical Details (Development Mode)
                  </summary>
                  <div className="text-xs font-mono text-gray-600 overflow-auto max-h-60">
                    <p className="font-bold text-red-600 mb-2">
                      {this.state.error.toString()}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleGoHome}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Return to Homepage
                </button>
                <button
                  onClick={this.handleReload}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reload Application
                </button>
              </div>

              {/* Support Info */}
              <p className="text-sm text-gray-500 font-body mt-8">
                If this problem persists, please contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
