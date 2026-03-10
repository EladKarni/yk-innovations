import { renderRichText } from "@/lib/renderRichText";

interface ProjectContentProps {
  fullDescription: any;
  features: string[];
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
}

export default function ProjectContent({
  fullDescription,
  features,
  challenge,
  solution,
  results,
}: ProjectContentProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      {/* Overview */}
      <div>
        <h2 className="text-3xl font-bold text-base-content mb-4">Overview</h2>
        {renderRichText(fullDescription)}
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-base-content mb-4">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-base-content/80">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Challenge & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-base-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-base-content mb-3">Challenge</h3>
          <p className="text-base-content/80">{challenge}</p>
        </div>
        <div className="bg-base-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-base-content mb-3">Solution</h3>
          <p className="text-base-content/80">{solution}</p>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-base-content mb-6">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((result, index) => (
              <div key={index} className="bg-primary/10 rounded-lg p-4 text-center flex flex-col justify-between min-h-[80px]">
                <div className="text-xl font-bold text-primary mb-1">{result.value}</div>
                <div className="text-xs text-base-content/70 mt-auto">{result.metric}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
