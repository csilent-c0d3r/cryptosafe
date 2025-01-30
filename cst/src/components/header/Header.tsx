import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../logo/Logo";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerOverlay}></div>
        <div className={styles.headerContent}>
          <Link href="/" className={styles.logoContainer}>
            <Logo className={styles.logo}/>
          </Link>

          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
            <div className={styles.navGroup}>
            </div>

            <div className={styles.navGroup}>
              <Link href="/ai-integration" className={styles.navLink}>
                Bank x AI
                <FaChevronDown className={styles.chevron} />
              </Link>
              <div className={styles.dropdown}>
                <Link href="/ai-integration/features">AI Features</Link>
                <Link href="/ai-integration/analytics">Analytics</Link>
                <Link href="/ai-integration/integration">Integration</Link>
              </div>
            </div>

            <Link href="/whitepaper" className={styles.navLink}>
              Whitepaper
            </Link>

            <Link 
              href="#roadmap" 
              className={styles.navLink}
              onClick={(e) => handleScrollTo(e, 'roadmap')}
              scroll={false}
            >
              Roadmap
            </Link>
            <Link 
              href="#safechat" 
              className={styles.navLink}
              onClick={(e) => handleScrollTo(e, 'safechat')}
              scroll={false}
            >
              SafeChat
            </Link>

            <div className={styles.cta}>
              <Link href="/tokensale" className={styles.primaryButton}>
                Buy CST
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;