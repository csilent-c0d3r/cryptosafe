"use client";

import React from "react";
import styles from "./Home.module.css";
import Header from "../components/header/Header";
import Hero from "../components/Hero/Hero";
import TokenomicsSection from "../components/sections/TokenomicsSection";
import AISection from "../components/sections/AISection";
import RoadmapSection from "../components/sections/RoadmapSection";
import TeamSection from "../components/sections/TeamSection";
import Footer from "../components/footer/Footer";
import { ParticleBackground } from "../components/background/ParticleBackground";
import SafeChatSection from "@/components/sections/SafeChatSection";
const Page = () => {
  return (
    
    <div className={styles.container}>
      <ParticleBackground />
      <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.mainContent}>
          <Hero />
          <TokenomicsSection />
          <AISection />
          <SafeChatSection />
          <RoadmapSection />
          <TeamSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
