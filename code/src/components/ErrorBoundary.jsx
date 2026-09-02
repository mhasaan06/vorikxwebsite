import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI Error Caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B0E10',
            color: '#F2F5F5',
            padding: '2rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: '#151B1E',
              border: '1px solid #168C88',
              borderRadius: '16px',
              padding: '2.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'rgba(22, 140, 136, 0.15)',
                color: '#168C88',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '1.75rem',
              }}
            >
              ⚠️
            </div>

            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                color: '#F2F5F5',
              }}
            >
              Application Notice
            </h2>

            <p
              style={{
                fontSize: '0.95rem',
                color: '#BEC7C9',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
              }}
            >
              An unexpected error occurred while rendering the page. Our team has been notified.
            </p>

            {this.state.error && (
              <div
                style={{
                  backgroundColor: '#0B0E10',
                  border: '1px solid rgba(190, 199, 201, 0.2)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  color: '#168C88',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {this.state.error.toString()}
              </div>
            )}

            <button
              onClick={this.handleReset}
              style={{
                backgroundColor: '#168C88',
                color: '#F2F5F5',
                border: 'none',
                padding: '0.75rem 1.75rem',
                borderRadius: '100px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
