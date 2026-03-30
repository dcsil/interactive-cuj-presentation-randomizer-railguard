import { JourneyTimeline } from '@/components/journey-timeline';
import { PersonaCard } from '@/components/persona-card';
import { FrictionMetrics } from '@/components/friction-metrics';
import { HighlightsLowlights } from '@/components/highlights-lowlights';
import { Recommendations } from '@/components/recommendations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import {
  persona,
  cujSteps,
  highlights,
  lowlights,
  productRecommendations,
  frictionMetrics,
} from '@/lib/cuj-data';
import { MapIcon, User, BarChart3, Lightbulb, Info } from 'lucide-react';

export default function CUJExplorer() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border/50 bg-gradient-to-br from-card via-card to-primary/5">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="mb-4 bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-balance text-5xl font-black tracking-tight text-transparent md:text-7xl">
              CUJ Explorer
            </h1>
            <p className="text-balance text-lg font-semibold text-muted-foreground md:text-xl">
              Interactive Critical User Journey Analysis
            </p>
            <p className="mt-2 text-base text-muted-foreground/80">
              Presentation Management System
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="journey" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="journey" className="gap-2">
              <MapIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Journey</span>
            </TabsTrigger>
            <TabsTrigger value="persona" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Persona</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="gap-2">
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Solutions</span>
            </TabsTrigger>
          </TabsList>

          {/* Journey Tab */}
          <TabsContent value="journey" className="space-y-8">
            <div>
              <h2 className="mb-3 text-3xl font-black text-foreground">User Journey Timeline</h2>
              <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground">
                Click any step to view detailed friction analysis, context switches, and technical recommendations.
              </p>
              <JourneyTimeline steps={cujSteps} />
            </div>
          </TabsContent>

          {/* Persona Tab */}
          <TabsContent value="persona" className="space-y-8">
            <div>
              <h2 className="mb-3 text-3xl font-black text-foreground">User Persona & Context</h2>
              <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground">
                Understanding the user and their environment is critical to identifying friction points.
              </p>
              <PersonaCard persona={persona} />
            </div>

            <Card className="border-warning/30 bg-warning/5 p-6">
              <h3 className="mb-3 text-lg font-bold text-foreground">The Unhappy Path</h3>
              <p className="leading-relaxed text-card-foreground">
                This is <strong>not a catastrophic failure</strong> yet <strong>high-stakes</strong>: The app works
                smoothly, but forces the instructor to compensate manually, creating{' '}
                <span className="text-warning">cognitive load</span>,{' '}
                <span className="text-destructive">context switches</span>, and a{' '}
                <span className="text-destructive">grading risk</span>.
              </p>
            </Card>
          </TabsContent>

          {/* Metrics Tab */}
          <TabsContent value="metrics" className="space-y-8">
            <div>
              <h2 className="mb-3 text-3xl font-black text-foreground">Friction Metrics Summary</h2>
              <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground">
                Quantifying the hidden costs of the current user experience.
              </p>
              <FrictionMetrics
                contextSwitchesPerTeam={frictionMetrics.contextSwitchesPerTeam}
                cognitiveLoad={frictionMetrics.cognitiveLoad}
                hiddenTimeCost={frictionMetrics.hiddenTimeCost}
              />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-foreground">Detailed Breakdown</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-muted bg-muted/30 p-5">
                  <h4 className="mb-3 font-semibold text-foreground">Context Switches Identified</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">→</span> App ↔ Quercus
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">→</span> App ↔ Notes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning">→</span> Notes ↔ Timer
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">→</span> Timer ↔ Excel/notes to log duration
                    </li>
                  </ul>
                </Card>

                <Card className="border-muted bg-muted/30 p-5">
                  <h4 className="mb-3 font-semibold text-foreground">Cognitive Load Sources</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-warning">→</span> Simultaneous timing and note-taking
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning">→</span> Manual time calculation for early finishes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">→</span> Grading judgment under time pressure
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">→</span> Post-class data reconstruction
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-8">
            <div>
              <h2 className="mb-3 text-3xl font-black text-foreground">Highlights & Lowlights</h2>
              <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground">
                What's working well and what needs improvement in the current experience.
              </p>
              <HighlightsLowlights highlights={highlights} lowlights={lowlights} />
            </div>
          </TabsContent>

          {/* Recommendations Tab */}
          <TabsContent value="recommendations" className="space-y-8">
            <div>
              <h2 className="mb-3 text-3xl font-black text-foreground">Product Recommendations</h2>
              <p className="mb-8 text-pretty text-base leading-relaxed text-muted-foreground">
                Engineering solutions to reduce friction and improve the user experience.
              </p>
              <Recommendations recommendations={productRecommendations} />
            </div>

            <Card className="border-primary/30 bg-primary/5 p-6">
              <h3 className="mb-3 text-lg font-bold text-foreground">Future User Advice / Pro-Tips</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                For instructors using the MVP in its current state:
              </p>
              <ul className="space-y-2 text-sm text-card-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Open Quercus slides before class to minimize disruption</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Take notes directly referencing timestamps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Avoid grading strictly on time unless manually logged accurately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 text-primary">•</span>
                  <span>Announce timing expectations clearly to students due to limited pacing cues</span>
                </li>
              </ul>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>CUJ Explorer</p>
        </div>
      </footer>
    </div>
  );
}
