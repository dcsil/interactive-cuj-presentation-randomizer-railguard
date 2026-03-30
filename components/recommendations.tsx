'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Zap, Target } from 'lucide-react';
import { ProductRecommendation } from '@/lib/cuj-data';
import { cn } from '@/lib/utils';

interface RecommendationsProps {
  recommendations: ProductRecommendation[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const colors = [
    {
      gradient: 'from-cyan-500/20 via-blue-500/20 to-cyan-600/20',
      border: 'border-cyan-500/50 hover:border-cyan-500',
      glow: 'shadow-cyan-500/30 hover:shadow-cyan-500/50',
      iconBg: 'bg-cyan-500/20',
      iconColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/15 border-cyan-500/50 text-cyan-400',
    },
    {
      gradient: 'from-blue-500/20 via-indigo-500/20 to-blue-600/20',
      border: 'border-blue-500/50 hover:border-blue-500',
      glow: 'shadow-blue-500/30 hover:shadow-blue-500/50',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      badgeBg: 'bg-blue-500/15 border-blue-500/50 text-blue-400',
    },
    {
      gradient: 'from-indigo-500/20 via-purple-500/20 to-indigo-600/20',
      border: 'border-indigo-500/50 hover:border-indigo-500',
      glow: 'shadow-indigo-500/30 hover:shadow-indigo-500/50',
      iconBg: 'bg-indigo-500/20',
      iconColor: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/15 border-indigo-500/50 text-indigo-400',
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {recommendations.map((rec, index) => {
        const isHovered = hoveredCard === index;
        const colorScheme = colors[index % colors.length];

        return (
          <Card
            key={index}
            className={cn(
              'group relative overflow-hidden border-2 p-8 transition-all duration-500',
              `bg-gradient-to-br ${colorScheme.gradient}`,
              colorScheme.border,
              colorScheme.glow,
              'hover:scale-[1.03] hover:shadow-2xl',
              'animate-in fade-in slide-in-from-bottom-4'
            )}
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'both',
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated Background Gradient */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500',
                colorScheme.gradient,
                'group-hover:opacity-100'
              )}
            />

            {/* Pulse Ring */}
            <div
              className={cn(
                'absolute inset-0 rounded-lg opacity-0 transition-all duration-500',
                isHovered && 'animate-ping opacity-20',
                colorScheme.border
              )}
            />

            <div className="relative z-10 space-y-6">
              {/* Icon & Badge */}
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    'flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500',
                    colorScheme.iconBg,
                    isHovered && 'scale-110 rotate-12'
                  )}
                >
                  <Lightbulb className={cn('h-8 w-8', colorScheme.iconColor)} />
                </div>
                <Badge variant="outline" className={cn('text-sm font-bold', colorScheme.badgeBg)}>
                  #{index + 1}
                </Badge>
              </div>

              {/* Title */}
              <div>
                <h4 className="text-xl font-black leading-tight text-foreground">{rec.title}</h4>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>Solution</span>
                </div>
                <p className="text-sm leading-relaxed text-card-foreground">{rec.description}</p>
              </div>

              {/* Impact */}
              <div className="space-y-2 rounded-xl border-2 border-foreground/10 bg-background/30 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Zap className={cn('h-5 w-5', colorScheme.iconColor)} />
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Impact</p>
                </div>
                <p className="text-sm font-semibold leading-relaxed text-foreground">{rec.impact}</p>
              </div>
            </div>

            {/* Shimmer Effect */}
            <div
              className={cn(
                'absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000',
                isHovered && 'translate-x-[100%]'
              )}
            />
          </Card>
        );
      })}
    </div>
  );
}
