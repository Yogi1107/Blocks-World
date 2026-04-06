import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
          <div className="bg-gray-900 border border-red-800 rounded-2xl p-8 max-w-md text-center">
            <div className="text-4xl mb-4"></div>
            <h2 className="text-white font-bold text-lg mb-2">Something went wrong</h2>
            <p className="text-gray-400 text-sm mb-4">
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-lg text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}