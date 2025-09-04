import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileContainer, ResponsiveGrid } from "@/components/layout";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <MobileContainer maxWidth="2xl">
        <div className="text-center">
          {/* Hero Section */}
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Smart<span className="text-primary">Hire</span> AI
            </h1>
            <p className="text-lg leading-8 text-muted-foreground sm:text-xl">
              Intelligent CV matching platform powered by AI for efficient recruitment
            </p>
          </div>

          {/* Features Preview using shadcn/ui Cards */}
          <ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 3 }} gap="lg" className="mb-8">
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="text-base">AI-Powered Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Advanced algorithms to match CVs with job descriptions
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="text-base">30-Second Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lightning-fast CV analysis and scoring
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-left sm:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Mobile-First Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Optimized for all devices and screen sizes
                </p>
              </CardContent>
            </Card>
          </ResponsiveGrid>

          {/* Status Badge using shadcn/ui Badge */}
          <div className="mb-8">
            <Badge variant="secondary" className="px-4 py-2">
              🏗️ E14-T2: shadcn/ui + Tailwind CSS Integration Complete
            </Badge>
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Button size="lg" className="min-h-touch">
              Get Started
            </Button>
          </div>

          {/* Development Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Next.js 14 • TypeScript • shadcn/ui • Tailwind CSS v4 • Mobile-First</p>
            <p className="mt-2">
              Ready for{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                E14-T3: Supabase Integration
              </code>
            </p>
          </div>
        </div>
      </MobileContainer>
    </div>
  );
}
