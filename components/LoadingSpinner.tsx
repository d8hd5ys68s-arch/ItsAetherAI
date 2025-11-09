'use client';

export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`${sizes[size]} border-gray-600 border-t-accent rounded-full animate-rotate ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingDots({ className = '' }: { className?: string }) {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    </div>
  );
}

export function LoadingPulse({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 animate-glow">
            <div className="w-24 h-24 border-4 border-accent/30 rounded-full" />
          </div>

          {/* Spinning gradient ring */}
          <div className="relative w-24 h-24 animate-rotate">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-primary blur-sm opacity-75" />
            <div className="absolute inset-2 rounded-full bg-background" />
          </div>

          {/* Center logo placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg animate-pulse" />
          </div>
        </div>

        <p className="mt-8 text-lg font-semibold text-gradient animate-shimmer">
          Initializing Aether...
        </p>
        <LoadingDots className="mt-4 justify-center" />
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-effect p-6 rounded-2xl space-y-4">
      <div className="skeleton h-6 w-3/4" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-5/6" />
      <div className="skeleton h-4 w-4/6" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: `${Math.random() * 30 + 60}%` }}
        />
      ))}
    </div>
  );
}
