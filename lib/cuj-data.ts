export type Severity = 'minimal' | 'moderate' | 'severe';

export interface CUJStep {
  id: number;
  userAction: string;
  contextSwitch: string;
  timeCost: string;
  severity: Severity;
  technicalRecommendation?: string;
  evidenceDescription?: string;
  evidenceImage?: string;
}

export interface FrictionPoint {
  title: string;
  severity: Severity;
  reason: string;
}

export interface ProductRecommendation {
  title: string;
  description: string;
  impact: string;
}

export const persona = {
  name: 'Professor Mario',
  characteristics: [
    'Teaches a lecture course with 40+ students',
    'Runs time-constrained, in-person presentations',
    'Must ensure fairness, consistency, and grading accuracy',
    'Juggles multiple tools during class (slides, timer, notes, Quercus)',
  ],
  primaryGoal:
    'Run a full presentation session fairly and on time, while accurately tracking performance for grading, without cognitive overload.',
  whyRandomizationMatters: [
    'Eliminate perceived instructor bias',
    'Prevent accusations of favoritism',
    'Create procedural fairness students can trust',
  ],
};

export const cujSteps: CUJStep[] = [
  {
    id: 1,
    userAction: 'Opens app and clicks "Start Presentations" for an existing class',
    contextSwitch: 'None',
    timeCost: '~3s',
    severity: 'minimal',
    technicalRecommendation: 'Maintain this simple, fast flow.',
    evidenceDescription: 'Screenshot showing app home screen with Start Presentations button',
    evidenceImage: '/1.png',
  },
  {
    id: 2,
    userAction: 'Clicks "Randomize Teams"',
    contextSwitch: 'None',
    timeCost: '~2s',
    severity: 'minimal',
    technicalRecommendation: 'Keep randomization algorithm efficient and fair.',
    evidenceDescription: 'Screenshot showing Randomize Teams button interface',
    evidenceImage: '/2.png',
  },
  {
    id: 3,
    userAction: 'App randomly selects a team (fair, non-biased)',
    contextSwitch: 'None',
    timeCost: '—',
    severity: 'minimal',
    technicalRecommendation: 'Core value proposition - maintain algorithmic fairness.',
    evidenceDescription: 'Screenshot showing randomly selected team displayed',
    evidenceImage: '/3.png',
  },
  {
    id: 4,
    userAction: 'Instructor announces team aloud',
    contextSwitch: 'Physical context (classroom)',
    timeCost: '~5s',
    severity: 'moderate',
    technicalRecommendation:
      'Consider adding audio announcement feature or larger display mode for class visibility.',
    evidenceDescription: 'Photo of instructor announcing team to class',
    evidenceImage: '/4.png',
  },
  {
    id: 5,
    userAction: 'Instructor searches for slides in Quercus',
    contextSwitch: 'External app switch',
    timeCost: '~20–30s',
    severity: 'severe',
    technicalRecommendation:
      'Add slide attachment or link field per team during import. Allow one-click access from dashboard to eliminate most expensive context switch.',
    evidenceDescription: 'Screenshot showing context switch from app to Quercus LMS',
    evidenceImage: '/5.png',
  },
  {
    id: 6,
    userAction: 'Instructor opens notes app beside timer',
    contextSwitch: 'Attention split',
    timeCost: '~10s',
    severity: 'severe',
    technicalRecommendation:
      'Implement built-in note-taking panel within app with per-team notes storage. Auto-timestamp notes relative to presentation time.',
    evidenceDescription: 'Screenshot showing separate notes app opened alongside timer',
    evidenceImage: '/6.png',
  },
  {
    id: 7,
    userAction: 'Starts presentation timer and takes notes simultaneously',
    contextSwitch: 'Cognitive load',
    timeCost: 'Ongoing',
    severity: 'severe',
    technicalRecommendation:
      'Add integrated note panel that reduces cognitive load by keeping all tools in one interface.',
    evidenceDescription: 'Screenshot showing instructor managing multiple windows',
    evidenceImage: '/7.png',
  },
  {
    id: 8,
    userAction: '2-minute warning appears',
    contextSwitch: 'Limited feedback',
    timeCost: '—',
    severity: 'moderate',
    technicalRecommendation:
      'Add configurable pacing milestones (e.g., 5min, 3min, 1min warnings) with visual and optional audio cues.',
    evidenceDescription: 'Screenshot showing 2-minute warning notification',
    evidenceImage: '/8.png',
  },
  {
    id: 9,
    userAction: 'Presentation ends early',
    contextSwitch: 'Manual math required',
    timeCost: '~5–10s',
    severity: 'moderate',
    technicalRecommendation:
      'Automatically calculate and display variance from expected duration when timer is stopped.',
    evidenceDescription: 'Screenshot showing timer stopped early with remaining time',
    evidenceImage: '/9.png',
  },
  {
    id: 10,
    userAction: 'Instructor monitors timer to decide late penalties',
    contextSwitch: 'Manual judgment',
    timeCost: '~10s',
    severity: 'moderate',
    technicalRecommendation:
      'Add visual indicators for grace periods and penalty thresholds based on configurable rules.',
    evidenceDescription: 'Screenshot showing instructor tracking time for penalties',
    evidenceImage: '/10.png',
  },
  {
    id: 11,
    userAction: 'Instructor resets timer for Q&A',
    contextSwitch: 'Task switch',
    timeCost: '~3s',
    severity: 'minimal',
    technicalRecommendation: 'Current implementation is effective.',
    evidenceDescription: 'Screenshot showing timer reset for Q&A session',
    evidenceImage: '/11.png',
  },
  {
    id: 12,
    userAction: 'Q&A ends; Instructor clicks "End Presentation"',
    contextSwitch: 'None',
    timeCost: '~1s',
    severity: 'minimal',
    technicalRecommendation: 'Maintain simple, single-click completion.',
    evidenceDescription: 'Screenshot showing End Presentation button',
    evidenceImage: '/12.png',
  },
  {
    id: 13,
    userAction: 'Instructor externally records duration for later grading',
    contextSwitch: 'External App Switch',
    timeCost: '~10s',
    severity: 'severe',
    technicalRecommendation:
      'Auto-capture and store actual presentation timestamps. Export grading report with team names, actual durations, and variance. Eliminate post-class manual logging.',
    evidenceDescription: 'Screenshot showing manual Excel data entry after class',
    evidenceImage: '/13.png',
  },
];

export const highlights: FrictionPoint[] = [
  {
    title: 'Randomized team selection ensures fairness and reduces bias',
    severity: 'minimal',
    reason: 'Core value proposition that builds trust',
  },
  {
    title: 'No duplicate team selection',
    severity: 'minimal',
    reason: 'Prevents procedural errors',
  },
  {
    title: 'Clear separation between presentation and Q&A timers',
    severity: 'minimal',
    reason: 'Reduces confusion during live sessions',
  },
  {
    title: 'Simple, fast interaction during live class',
    severity: 'minimal',
    reason: 'Minimizes instructor burden during critical moments',
  },
];

export const lowlights: FrictionPoint[] = [
  {
    title: 'Slides must be opened in Quercus',
    severity: 'severe',
    reason: 'Forces external context switch during live session',
  },
  {
    title: 'No automatic capture of actual presentation duration',
    severity: 'severe',
    reason: 'Creates grading risk and fairness issues',
  },
  {
    title: 'Early finishes require manual time calculation',
    severity: 'moderate',
    reason: 'Mental math under pressure',
  },
  {
    title: 'Only one visual warning at 2 minutes',
    severity: 'moderate',
    reason: 'Poor pacing feedback for presenters',
  },
  {
    title: 'Instructor must manually log durations',
    severity: 'severe',
    reason: 'Forces context switch and file management post session',
  },
];

export const productRecommendations: ProductRecommendation[] = [
  {
    title: 'Automatic Time Capture',
    description:
      'Log actual start and end timestamps, store duration per team, display "Finished X minutes early/late" when presentation ended',
    impact: 'Eliminates grading ambiguity and improves fairness and post-class accuracy',
  },
  {
    title: 'Slide Attachment or Link Field',
    description:
      'Allow slide URLs or uploads per team during the class-list import with one-click access from the dashboard',
    impact: 'Removes the most expensive context switch and keeps instructor inside the app during live class',
  },
  {
    title: 'Integrated Note-Taking',
    description:
      'Built-in note panel with per-team storage and auto-timestamped entries relative to presentation time',
    impact: 'Reduces cognitive load and eliminates external app switching during sessions',
  },
];

export const frictionMetrics = {
  contextSwitchesPerTeam: '4-5 switches',
  cognitiveLoad: 'Timing + note-taking + grading judgment simultaneously',
  hiddenTimeCost: '~30–45 seconds per team not accounted for in app flow',
};
