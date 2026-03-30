'use client';

import { useState } from 'react';
import { CUJStep } from '@/lib/cuj-data';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertCircle, CheckCircle2, AlertTriangle, Clock, ArrowRightLeft, Zap, Eye, Sparkles, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JourneyTimelineProps {
  steps: CUJStep[];
}

export function JourneyTimeline({ steps }: JourneyTimelineProps) {
  const [selectedStep, setSelectedStep] = useState<CUJStep | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const getSeverityIcon = (severity: CUJStep['severity']) => {
    switch (severity) {
      case 'severe':
        return <AlertCircle className="h-6 w-6" />;
      case 'moderate':
        return <AlertTriangle className="h-6 w-6" />;
      case 'minimal':
        return <CheckCircle2 className="h-6 w-6" />;
    }
  };

  const getSeverityColor = (severity: CUJStep['severity']) => {
    switch (severity) {
      case 'severe':
        return {
          bg: 'bg-red-500/10 hover:bg-red-500/20',
          border: 'border-red-500/50 hover:border-red-500',
          text: 'text-red-500',
          glow: 'shadow-red-500/30 hover:shadow-red-500/50',
          accent: 'from-red-500/20 to-red-600/20',
          badgeBg: 'bg-red-500/15 border-red-500/50 text-red-400',
        };
      case 'moderate':
        return {
          bg: 'bg-amber-500/10 hover:bg-amber-500/20',
          border: 'border-amber-500/50 hover:border-amber-500',
          text: 'text-amber-500',
          glow: 'shadow-amber-500/30 hover:shadow-amber-500/50',
          accent: 'from-amber-500/20 to-orange-500/20',
          badgeBg: 'bg-amber-500/15 border-amber-500/50 text-amber-400',
        };
      case 'minimal':
        return {
          bg: 'bg-emerald-500/10 hover:bg-emerald-500/20',
          border: 'border-emerald-500/50 hover:border-emerald-500',
          text: 'text-emerald-500',
          glow: 'shadow-emerald-500/30 hover:shadow-emerald-500/50',
          accent: 'from-emerald-500/20 to-green-500/20',
          badgeBg: 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400',
        };
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => {
          const colors = getSeverityColor(step.severity);
          const isHovered = hoveredStep === step.id;

          return (
            <Card
              key={step.id}
              className={cn(
                'group relative cursor-pointer overflow-hidden border-2 p-8 transition-all duration-500 ease-out',
                colors.bg,
                colors.border,
                colors.glow,
                'hover:scale-[1.03] hover:shadow-2xl',
                'animate-in fade-in slide-in-from-bottom-4'
              )}
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
              onClick={() => setSelectedStep(step)}
              onMouseEnter={() => setHoveredStep(step.id)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Animated Background Gradient */}
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500',
                colors.accent,
                'group-hover:opacity-100'
              )} />
              
              {/* Shimmer Effect */}
              <div className={cn(
                'absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000',
                isHovered && 'translate-x-[100%]'
              )} />

              {/* Step Number Badge with Pulse */}
              <div className={cn(
                'absolute -right-3 -top-3 flex h-14 w-14 items-center justify-center rounded-full border-4 bg-background font-mono text-xl font-black shadow-2xl transition-all duration-500',
                colors.border,
                isHovered && 'scale-110 rotate-12'
              )}>
                <span className={colors.text}>{step.id}</span>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-5">
                {/* Severity Icon with Bounce */}
                <div className={cn(
                  'inline-flex items-center justify-center rounded-xl bg-background/50 p-3 backdrop-blur-sm transition-all duration-500',
                  colors.text,
                  isHovered && 'scale-110 animate-bounce'
                )}>
                  {getSeverityIcon(step.severity)}
                </div>

                {/* User Action */}
                <p className="min-h-[4.5rem] text-pretty text-base font-semibold leading-relaxed text-foreground">
                  {step.userAction}
                </p>

                {/* Metadata */}
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/50">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      'text-xs font-bold uppercase tracking-wide transition-all duration-300',
                      colors.badgeBg,
                      isHovered && 'scale-105'
                    )}
                  >
                    {step.severity}
                  </Badge>

                  <div className={cn(
                    'flex items-center gap-1.5 text-sm font-semibold opacity-0 transition-all duration-500',
                    colors.text,
                    'group-hover:opacity-100 group-hover:translate-x-0 translate-x-4'
                  )}>
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </div>
                </div>
              </div>

              {/* Glowing Border on Hover */}
              <div className={cn(
                'absolute -inset-px rounded-lg opacity-0 blur-sm transition-opacity duration-500',
                'group-hover:opacity-100',
                colors.glow
              )} />
            </Card>
          );
        })}
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedStep && !fullscreenImage} onOpenChange={() => setSelectedStep(null)}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start gap-6">
              <div
                className={cn(
                  'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-4 font-mono text-2xl font-black shadow-2xl',
                  selectedStep && getSeverityColor(selectedStep.severity).border,
                  selectedStep && getSeverityColor(selectedStep.severity).bg
                )}
              >
                <span className={selectedStep && getSeverityColor(selectedStep.severity).text}>
                  {selectedStep?.id}
                </span>
              </div>
              <div className="flex-1">
                <DialogTitle className="text-pretty text-left text-2xl font-bold leading-snug">
                  {selectedStep?.userAction}
                </DialogTitle>
                <Badge 
                  variant="outline" 
                  className={cn(
                    'mt-3 text-sm font-bold uppercase tracking-wide',
                    selectedStep && getSeverityColor(selectedStep.severity).badgeBg
                  )}
                >
                  {selectedStep && getSeverityIcon(selectedStep.severity)}
                  <span className="ml-2">{selectedStep?.severity} Friction</span>
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-8 pt-8">
            {/* Metrics Cards */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Card className="group relative overflow-hidden border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-6 transition-all duration-500 hover:scale-[1.02] hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-sm font-semibold text-blue-400">
                    <div className="rounded-xl bg-blue-500/20 p-2.5">
                      <ArrowRightLeft className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>Context Switch</span>
                  </div>
                  <p className="mt-4 text-xl font-bold leading-relaxed text-foreground">{selectedStep?.contextSwitch}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Card>

              <Card className="group relative overflow-hidden border-2 border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-6 transition-all duration-500 hover:scale-[1.02] hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-sm font-semibold text-purple-400">
                    <div className="rounded-xl bg-purple-500/20 p-2.5">
                      <Clock className="h-5 w-5 text-purple-400" />
                    </div>
                    <span>Time Cost</span>
                  </div>
                  <p className="mt-4 text-xl font-bold leading-relaxed text-foreground">{selectedStep?.timeCost}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Card>
            </div>

            {/* Technical Recommendation */}
            {selectedStep?.technicalRecommendation && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 p-2.5">
                    <Zap className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Technical Recommendation</h4>
                </div>
                <Card className="group relative overflow-hidden border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-cyan-600/10 to-blue-600/10 p-6 transition-all duration-500 hover:border-cyan-500/60 hover:shadow-xl hover:shadow-cyan-500/20">
                  <p className="relative z-10 text-base leading-relaxed text-card-foreground">{selectedStep.technicalRecommendation}</p>
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-500 group-hover:bg-cyan-500/20" />
                </Card>
              </div>
            )}

            {/* Evidence Placeholder */}
            {selectedStep?.evidenceDescription && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 p-2.5">
                    <Eye className="h-6 w-6 text-pink-400" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">Evidence</h4>
                </div>
                <Card className="group relative overflow-hidden border-2 border-dashed border-pink-500/40 bg-gradient-to-br from-pink-500/5 to-pink-600/5 transition-all duration-500 hover:border-pink-500/70 hover:shadow-xl hover:shadow-pink-500/20">
                  {selectedStep.evidenceImage ? (
                    <div 
                      onClick={() => setFullscreenImage(selectedStep.evidenceImage!)}
                      className="block cursor-pointer"
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        <img 
                          src={selectedStep.evidenceImage} 
                          alt={selectedStep.evidenceDescription}
                          className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <p className="text-xs text-white/80">Click to view full size</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex aspect-video items-center justify-center p-12">
                      <div className="text-center">
                        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-pink-500/10 p-6 text-6xl">
                          <Sparkles className="h-16 w-16 text-pink-400 animate-pulse" />
                        </div>
                        <p className="text-base font-semibold text-pink-400">{selectedStep.evidenceDescription}</p>
                        <p className="mt-2 text-sm text-muted-foreground">(Screenshot will be added here)</p>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in"
          onClick={() => setFullscreenImage(null)}
        >
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-4 right-4 z-[101] rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20 hover:scale-110"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div 
            className="relative max-h-[90vh] max-w-[90vw] animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={fullscreenImage} 
              alt="Evidence fullscreen" 
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
