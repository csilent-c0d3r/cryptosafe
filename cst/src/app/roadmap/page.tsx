'use client';

import React from 'react';
import Roadmap from '@/components/roadmap/Roadmap';
import styles from './page.module.css';
import AnimatedBackground from '@/components/background/AnimatedBackground';

export default function RoadmapPage() {
    return (
        <main className={styles.main}>
            <AnimatedBackground />
            <Roadmap />
        </main>
    );
}
