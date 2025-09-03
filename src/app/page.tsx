export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="mx-auto max-w-2xl text-center">
        {/* Hero Section */}
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Smart<span className="text-blue-600">Hire</span> AI
          </h1>
          <p className="text-lg leading-8 text-gray-600 sm:text-xl">
            Intelligent CV matching platform powered by AI for efficient recruitment
          </p>
        </div>

        {/* Features Preview */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-4 text-left">
            <h3 className="font-semibold text-gray-900">AI-Powered Matching</h3>
            <p className="text-sm text-gray-600">
              Advanced algorithms to match CVs with job descriptions
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 text-left">
            <h3 className="font-semibold text-gray-900">30-Second Processing</h3>
            <p className="text-sm text-gray-600">
              Lightning-fast CV analysis and scoring
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-4 text-left sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-gray-900">Mobile-First Design</h3>
            <p className="text-sm text-gray-600">
              Optimized for all devices and screen sizes
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            🏗️ Phase 1 Foundation - Sprint 1.1 in progress
          </span>
        </div>

        {/* Development Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Next.js 14 • TypeScript • Tailwind CSS • Mobile-First</p>
          <p className="mt-2">
            Ready for{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-mono">
              E14-T2: shadcn/ui Integration
            </code>
          </p>
        </div>
      </div>
    </div>
  );
}
