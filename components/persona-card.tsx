'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Target, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PersonaCardProps {
  persona: {
    name: string;
    characteristics: string[];
    primaryGoal: string;
    whyRandomizationMatters: string[];
  };
}

export function PersonaCard({ persona }: PersonaCardProps) {
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);
  const [hoveredReason, setHoveredReason] = useState<number | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Left Column - Profile & Characteristics */}
      <div className="space-y-6">
        {/* Profile Card */}
        <Card className="border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 p-6">
          <div className="flex items-start gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-primary/30 ring-2 ring-primary/20">
              <img 
                src="/mario.jpg" 
                alt={persona.name}
                className="h-full w-full object-cover"
                style={{ objectPosition: '65% 25%' }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">User Persona</p>
              <h3 className="mb-2 text-3xl font-bold text-foreground">{persona.name}</h3>
              <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                Primary User
              </Badge>
            </div>
          </div>
        </Card>

        {/* Characteristics */}
        <Card className="border-2 border-muted bg-card p-6">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Characteristics
          </h4>
          <div className="space-y-3">
            {persona.characteristics.map((char, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-start gap-3 rounded-lg border-2 border-transparent p-3 transition-all duration-200',
                  hoveredChar === index && 'border-primary/30 bg-primary/5'
                )}
                onMouseEnter={() => setHoveredChar(index)}
                onMouseLeave={() => setHoveredChar(null)}
              >
                <div className={cn(
                  'mt-1 h-2 w-2 shrink-0 rounded-full bg-primary transition-transform duration-200',
                  hoveredChar === index && 'scale-150'
                )} />
                <p className="text-sm leading-relaxed text-card-foreground">{char}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Column - Goal & Randomization */}
      <div className="space-y-6">
        {/* Primary Goal */}
        <Card className="border-2 border-accent/40 bg-gradient-to-br from-accent/10 to-accent/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <h4 className="text-lg font-bold text-foreground">Primary User Goal</h4>
          </div>
          <div className="rounded-lg border-2 border-accent/30 bg-card/50 p-5 backdrop-blur-sm">
            <p className="leading-relaxed text-card-foreground">{persona.primaryGoal}</p>
          </div>
        </Card>

        {/* Why Randomization Matters */}
        <Card className="border-2 border-success/40 bg-gradient-to-br from-success/10 to-success/5 p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/20">
              <ShieldCheck className="h-6 w-6 text-success" />
            </div>
            <h4 className="text-lg font-bold text-foreground">Why Randomization Matters</h4>
          </div>
          <div className="space-y-3">
            {persona.whyRandomizationMatters.map((reason, index) => (
              <div
                key={index}
                className={cn(
                  'group cursor-pointer rounded-lg border-2 border-success/20 bg-card/50 p-4 backdrop-blur-sm transition-all duration-200 hover:border-success/40 hover:shadow-md',
                  hoveredReason === index && 'scale-[1.02] shadow-success/20'
                )}
                onMouseEnter={() => setHoveredReason(index)}
                onMouseLeave={() => setHoveredReason(null)}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-xs font-bold text-success transition-transform duration-200',
                    hoveredReason === index && 'scale-110'
                  )}>
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-foreground">{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
