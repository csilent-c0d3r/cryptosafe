import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import { FaTwitter, FaTelegram, FaGithub, FaDiscord, FaMedium } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerOverlay}></div>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.newsletterSection}>
            <h3>Stay Updated</h3>
            <p>Get the latest updates about CryptoSafe</p>
            <div className={styles.subscribeForm}>
              <input type="email" placeholder="Enter your email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>

          <div className={styles.linksGrid}>
            <div className={styles.linkColumn}>
              <h4>Product</h4>
              <Link href="/safechat">SafeChat</Link>
              <Link href="/ai-integration">Bank x AI</Link>
              <Link href="/tokensale">Buy CST</Link>
              <Link href="/staking">Staking</Link>
            </div>

            <div className={styles.linkColumn}>
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/roadmap">Roadmap</Link>
              <Link href="/whitepaper">Whitepaper</Link>
              <Link href="/team">Team</Link>
            </div>

            <div className={styles.linkColumn}>
              <h4>Resources</h4>
              <Link href="/documentation">Documentation</Link>
              <Link href="/api">API</Link>
              <Link href="/support">Support</Link>
              <Link href="/security">Security</Link>
            </div>

            <div className={styles.linkColumn}>
              <h4>Legal</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/cookies">Cookie Policy</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </div>
          </div>
        </div>

        <div className={styles.middleSection}>
          <div className={styles.companyInfo}>
            <h3>CryptoSafe Company</h3>
            <p>Building the future of decentralized finance with security at its core.</p>
            <address>
              <p>📍 Lausanne, Switzerland</p>
              <p>📧 admin@cryptosafe.ch</p>
            </address>
          </div>
          <div className={styles.socialLinks}>
            <Link href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </Link>
            <Link href="https://telegram.org" aria-label="Telegram">
              <FaTelegram />
            </Link>
            <Link href="https://github.com" aria-label="GitHub">
              <FaGithub />
            </Link>
            <Link href="https://discord.com" aria-label="Discord">
              <FaDiscord />
            </Link>
            <Link href="https://medium.com" aria-label="Medium">
              <FaMedium />
            </Link>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p>© 2024 CryptoSafe. All rights reserved.</p>
          <div className={styles.certifications}>
            <span>ISO 27001 Certified</span>
            <span>SOC 2 Compliant</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
