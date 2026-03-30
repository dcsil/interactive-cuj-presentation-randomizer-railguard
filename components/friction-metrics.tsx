'use client';

import { Card } from '@/components/ui/card';
import { ArrowRightLeft, Brain, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FrictionMetricsProps {
  contextSwitchesPerTeam: string;
  cognitiveLoad: string;
  hiddenTimeCost: string;
}

export function FrictionMetrics({
  contextSwitchesPerTeam,
  cognitiveLoad,
  hiddenTimeCost,
}: FrictionMetricsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const metrics = [
    {
      id: 'switches',
      title: 'Context Switches',
      value: contextSwitchesPerTeam,
      icon: ArrowRightLeft,
      gradient: 'from-red-500/20 via-red-600/20 to-rose-600/20',
      border: 'border-red-500/50 hover:border-red-500',
      glow: 'shadow-red-500/30 hover:shadow-red-500/50',
      iconBg: 'bg-red-500/20',
      iconColor: 'text-red-400',
    },
    {
      id: 'load',
      title: 'Cognitive Load',
      value: cognitiveLoad,
      icon: Brain,
      gradient: 'from-amber-500/20 via-orange-500/20 to-amber-600/20',
      border: 'border-amber-500/50 hover:border-amber-500',
      glow: 'shadow-amber-500/30 hover:shadow-amber-500/50',
      iconBg: 'bg-amber-500/20',
      iconColor: 'text-amber-400',
    },
    {
      id: 'time',
      title: 'Hidden Time Cost',
      value: hiddenTimeCost,
      icon: Clock,
      gradient: 'from-purple-500/20 via-purple-600/20 to-pink-600/20',
      border: 'border-purple-500/50 hover:border-purple-500',
      glow: 'shadow-purple-500/30 hover:shadow-purple-500/50',
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isHovered = hoveredCard === metric.id;

        return (
          <Card
            key={metric.id}
            className={cn(
              'group relative overflow-hidden border-2 p-8 transition-all duration-500',
              `bg-gradient-to-br ${metric.gradient}`,
              metric.border,
              metric.glow,
              'hover:scale-105 hover:shadow-2xl',
              'animate-in fade-in slide-in-from-bottom-4'
            )}
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both',
            }}
            onMouseEnter={() => setHoveredCard(metric.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated Background */}
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500',
                metric.gradient,
                'group-hover:opacity-100'
              )}
            />

            {/* Pulse Ring */}
            <div
              className={cn(
                'absolute inset-0 rounded-lg opacity-0 transition-all duration-500',
                isHovered && 'animate-ping opacity-20',
                metric.border
              )}
            />

            <div className="relative z-10 space-y-6">
              {/* Icon */}
              <div
                className={cn(
                  'inline-flex items-center justify-center rounded-2xl p-4 transition-all duration-500',
                  metric.iconBg,
                  isHovered && 'scale-110 rotate-6'
                )}
              >
                <Icon className={cn('h-8 w-8', metric.iconColor)} />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-muted-foreground">
                  {metric.title}
                </h3>
                <p className="text-2xl font-black leading-tight text-foreground">
                  {metric.value}
                </p>
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
