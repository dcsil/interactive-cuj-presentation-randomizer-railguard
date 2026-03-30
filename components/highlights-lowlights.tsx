'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { FrictionPoint } from '@/lib/cuj-data';
import { cn } from '@/lib/utils';

interface HighlightsLowlightsProps {
  highlights: FrictionPoint[];
  lowlights: FrictionPoint[];
}

export function HighlightsLowlights({ highlights, lowlights }: HighlightsLowlightsProps) {
  const [hoveredHighlight, setHoveredHighlight] = useState<number | null>(null);
  const [hoveredLowlight, setHoveredLowlight] = useState<number | null>(null);

  const getSeverityIcon = (severity: FrictionPoint['severity']) => {
    switch (severity) {
      case 'severe':
        return <AlertCircle className="h-4 w-4" />;
      case 'moderate':
        return <AlertTriangle className="h-4 w-4" />;
      case 'minimal':
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getSeverityBadge = (severity: FrictionPoint['severity']) => {
    switch (severity) {
      case 'severe':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'moderate':
        return 'bg-warning/20 text-warning border-warning/50';
      case 'minimal':
        return 'bg-success/20 text-success border-success/50';
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Highlights */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-3">
            <TrendingUp className="h-6 w-6 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-black text-foreground">What Works</h3>
        </div>

        <div className="space-y-4">
          {highlights.map((highlight, index) => {
            const isHovered = hoveredHighlight === index;

            return (
              <Card
                key={index}
                className={cn(
                  'group relative overflow-hidden border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-green-500/10 p-6 transition-all duration-500',
                  'hover:scale-[1.02] hover:border-emerald-500/60 hover:shadow-xl hover:shadow-emerald-500/20',
                  'animate-in fade-in slide-in-from-left-4'
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
                onMouseEnter={() => setHoveredHighlight(index)}
                onMouseLeave={() => setHoveredHighlight(null)}
              >
                {/* Animated Background */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-500',
                    'group-hover:opacity-100'
                  )}
                />

                <div className="relative z-10 space-y-3">
                  <p className="text-pretty text-base font-semibold leading-relaxed text-foreground">
                    {highlight.title}
                  </p>
                  <div className="flex items-start gap-2 border-t border-emerald-500/20 pt-3">
                    <div className="mt-0.5 text-emerald-400">→</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {highlight.reason}
                    </p>
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div
                  className={cn(
                    'absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent transition-transform duration-1000',
                    isHovered && 'translate-x-[100%]'
                  )}
                />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Lowlights */}
      <div className="space-y-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 p-3">
            <TrendingDown className="h-6 w-6 text-red-400" />
          </div>
          <h3 className="text-2xl font-black text-foreground">Friction Points</h3>
        </div>

        <div className="space-y-4">
          {lowlights.map((lowlight, index) => {
            const isHovered = hoveredLowlight === index;

            const getSeverityConfig = (severity: string) => {
              switch (severity) {
                case 'severe':
                  return {
                    badge: 'bg-red-500/20 text-red-400 border-red-500/50',
                    border: 'border-red-500/40 hover:border-red-500/70',
                    gradient: 'from-red-500/10 to-rose-500/10',
                    glow: 'hover:shadow-red-500/20',
                    arrow: 'text-red-400',
                  };
                case 'moderate':
                  return {
                    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
                    border: 'border-amber-500/40 hover:border-amber-500/70',
                    gradient: 'from-amber-500/10 to-orange-500/10',
                    glow: 'hover:shadow-amber-500/20',
                    arrow: 'text-amber-400',
                  };
                default:
                  return {
                    badge: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
                    border: 'border-gray-500/40 hover:border-gray-500/70',
                    gradient: 'from-gray-500/10 to-gray-600/10',
                    glow: 'hover:shadow-gray-500/20',
                    arrow: 'text-gray-400',
                  };
              }
            };

            const config = getSeverityConfig(lowlight.severity);

            return (
              <Card
                key={index}
                className={cn(
                  'group relative overflow-hidden border-2 p-6 transition-all duration-500',
                  `bg-gradient-to-br ${config.gradient}`,
                  config.border,
                  config.glow,
                  'hover:scale-[1.02] hover:shadow-xl',
                  'animate-in fade-in slide-in-from-right-4'
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'both',
                }}
                onMouseEnter={() => setHoveredLowlight(index)}
                onMouseLeave={() => setHoveredLowlight(null)}
              >
                {/* Animated Background */}
                <div
                  className={cn(
                    'absolute inset-0 opacity-0 transition-opacity duration-500',
                    `bg-gradient-to-br ${config.gradient}`,
                    'group-hover:opacity-100'
                  )}
                />

                {/* Severity Badge */}
                <div
                  className={cn(
                    'absolute right-4 top-4 transition-all duration-500',
                    isHovered ? 'scale-110' : 'scale-100'
                  )}
                >
                  <Badge variant="outline" className={cn('text-xs font-bold uppercase', config.badge)}>
                    {lowlight.severity}
                  </Badge>
                </div>

                <div className="relative z-10 space-y-3">
                  <p className="text-pretty text-base font-semibold leading-relaxed text-foreground pr-20">
                    {lowlight.title}
                  </p>
                  <div className={cn('flex items-start gap-2 border-t pt-3', `${config.border.split(' ')[0]}/20`)}>
                    <div className={cn('mt-0.5', config.arrow)}>→</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {lowlight.reason}
                    </p>
                  </div>
                </div>

                {/* Shimmer Effect */}
                <div
                  className={cn(
                    'absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000',
                    isHovered && 'translate-x-[100%]'
                  )}
                />
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
