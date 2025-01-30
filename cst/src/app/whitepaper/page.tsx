'use client';

import Whitepaper from '../../components/whitepaper';
import AnimatedBackground from '@/components/background/AnimatedBackground';

export default function WhitepaperPage() {
  return (
    <div className="whitepaper-container"> 
      <AnimatedBackground /> 
      <Whitepaper />
    </div>
  );
}
