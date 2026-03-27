import { Button } from "@mantine/core";
import FooterLinks from "./Footer";
import "./font.css";
import "./homepage.css";
import logoWordmark from "./logo/png/logo-no-background.png";
import driveLogo from "./logo/logo_drive_2020q4_color_2x_web_64dp.png";
import googleSignIn from "./logo/btn_google_signin_light_normal_web@2x.png";
import automatedImage from "./logo/online_backup_cloud_service-100737202-orig.webp";
import restoreImage from "./logo/images-restore.jpeg";
import userFriendlyImage from "./logo/userfrendlt.jpeg";
import gdrpImage from "./logo/gdrp.png";
import securityImage from "./logo/security.png";
import dataOwnImage from "./logo/own-your-data.png";
import seamlessCloudImage from "./logo/Seamless-Cloud-Integration.png";
import schedulingOptionsImage from "./logo/Scheduling-Options-in-cloud-backup--cloud-backup-technology-.png";
import freeStorageImage from "./logo/Limitless-Storage-with-a-Generous-Offer--cloud-backup-technology-.png";
import timerImage from "./logo/timer.png";
import hardDriveImage from "./logo/hard-disk-drive.png";
import hardwareFailImage from "./logo/error.png";
import moneyImage from "./logo/dollar.png";

const apiServer = process.env.REACT_APP_API_SERVER;

const heroHighlights = [
  "Store up to 20 GB in the cloud and retrieve it whenever you need it.",
  "Capture secure snapshots of your Google Drive without manual exports.",
  "Run scheduled backups automatically so the latest version is always protected.",
  "Download or restore folders quickly when you need to recover work.",
];

const productivityCards = [
  {
    eyebrow: "Automation",
    title: "Automated backups that stay out of your way",
    description:
      "Set a schedule once and let dBackUp keep new snapshots flowing into protected cloud storage. No more manual copy jobs or forgotten backup days.",
    image: automatedImage,
    alt: "Automated backup illustration",
  },
  {
    eyebrow: "Recovery",
    title: "Fast file restoration when something goes wrong",
    description:
      "Restore individual files or entire folders without disrupting your workflow. Recovery stays simple even when the original data has already been deleted.",
    image: restoreImage,
    alt: "File restoration illustration",
  },
  {
    eyebrow: "Usability",
    title: "A cleaner workflow for non-technical teams",
    description:
      "The interface is designed to make setup, monitoring, and recovery readable at a glance so backups feel dependable instead of intimidating.",
    image: userFriendlyImage,
    alt: "User-friendly interface illustration",
  },
];

const trustCards = [
  {
    title: "You keep control of your data",
    description:
      "dBackUp connects your cloud drives and keeps recovery simple, while your files stay within storage you trust and manage.",
    image: dataOwnImage,
    alt: "Data ownership illustration",
  },
  {
    title: "Protected transfers by default",
    description:
      "Google OAuth and encrypted transfers reduce friction without asking users to hand over raw credentials or risky manual exports.",
    image: securityImage,
    alt: "Security illustration",
  },
  {
    title: "Privacy-minded handling",
    description:
      "The product is built to process only the data needed for backup and restore flows, with a cleaner path toward compliance expectations.",
    image: gdrpImage,
    alt: "Compliance illustration",
  },
];

const featureCards = [
  {
    title: "Seamless cloud transfer",
    description:
      "Move files into backup storage directly instead of juggling downloads and re-uploads.",
    image: seamlessCloudImage,
    alt: "Seamless cloud integration illustration",
  },
  {
    title: "Flexible scheduling",
    description:
      "Run backups on the cadence that fits your team instead of relying on ad hoc manual reminders.",
    image: schedulingOptionsImage,
    alt: "Scheduling options illustration",
  },
  {
    title: "20 GB included",
    description:
      "Start protecting important folders immediately with included storage for essential backup sets.",
    image: freeStorageImage,
    alt: "Free storage illustration",
  },
  {
    title: "Simple recovery flow",
    description:
      "Find the snapshot you need, restore it, and get back to work without a complex restore wizard.",
    image: userFriendlyImage,
    alt: "Simple recovery interface illustration",
  },
];

const riskStats = [
  {
    value: "10s",
    label: "between ransomware attacks worldwide",
    description:
      "Frequent attacks make reliable recoverability more important than manual backup habits.",
    image: timerImage,
    alt: "Timer illustration",
  },
  {
    value: "100K",
    label: "hard drives fail every week in the U.S.",
    description:
      "Local devices fail constantly, which is why an off-device snapshot matters.",
    image: hardDriveImage,
    alt: "Hard drive illustration",
  },
  {
    value: "40%",
    label: "of data loss comes from hardware failure",
    description:
      "Not every incident is malicious. A practical backup plan covers routine failures too.",
    image: hardwareFailImage,
    alt: "Hardware failure illustration",
  },
  {
    value: "$600B",
    label: "in yearly global cybercrime losses",
    description:
      "Recoverability is part of resilience, not just a storage convenience feature.",
    image: moneyImage,
    alt: "Financial impact illustration",
  },
];

const footerData = [
  {
    title: "Product",
    links: [
      { label: "Features", link: "/features" },
      { label: "Pricing", link: "/pageinconstruction" },
      {
        label: "Google API uses Disclosure",
        link: "/google-api-services-disclosure",
      },
      { label: "Why dBackUp", link: "/pageinconstruction" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", link: "/aboutus" },
      { label: "Support", link: "/pageinconstruction" },
      { label: "Help Guides", link: "/pageinconstruction" },
      { label: "Articles", link: "/pageinconstruction" },
    ],
  },
];

function HomePage() {
  const connectUrl = apiServer ? `${apiServer}/connect` : "/connect";
  const loginUrl = apiServer ? `${apiServer}/login` : "/login";

  const handleConnectNow = () => {
    window.location.href = connectUrl;
  };

  const handleLoginNow = () => {
    window.location.href = loginUrl;
  };

  return (
    <main className="homepage">
      <section className="homepage-hero">
        <div className="homepage-shell homepage-hero-grid">
          <div className="homepage-hero-copy">
            <p className="homepage-kicker">Google Drive backup on autopilot</p>
            <h1 className="homepage-title">
              Protect every important folder before a mistake, outage, or device
              failure turns into lost work.
            </h1>
            <p className="homepage-subtitle">
              dBackUp keeps scheduled cloud snapshots readable and recoverable,
              so your team can back up once, monitor less, and recover faster.
            </p>

            <div className="homepage-highlight-list">
              {heroHighlights.map((item) => (
                <div className="homepage-highlight-item" key={item}>
                  <span className="homepage-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="homepage-cta-row">
              <Button
                radius="xl"
                className="homepage-connect-button"
                onClick={handleConnectNow}
              >
                <span>Connect Google Drive</span>
                <img src={driveLogo} alt="Google Drive logo" />
              </Button>

              <button
                type="button"
                className="homepage-google-button"
                onClick={handleLoginNow}
                aria-label="Sign in with Google"
              >
                <img src={googleSignIn} alt="Sign in with Google" />
              </button>
            </div>

            <p className="homepage-cta-note">
              Already have a backup? Sign in to restore files, download folders,
              or update your schedule.
            </p>
          </div>

          <div className="homepage-hero-visual">
            <article className="homepage-hero-card homepage-hero-card-primary">
              <span className="homepage-chip">dBackUp cloud workspace</span>
              <img
                className="homepage-wordmark"
                src={logoWordmark}
                alt="dBackUp logo"
              />
              <p className="homepage-hero-card-copy">
                Automated snapshots, protected transfers, and one-click recovery
                for the folders your team cannot afford to lose.
              </p>

              <div className="homepage-stat-tiles">
                <div className="homepage-stat-tile">
                  <strong>20 GB</strong>
                  <span>Included cloud storage</span>
                </div>
                <div className="homepage-stat-tile">
                  <strong>24/7</strong>
                  <span>Scheduled backup coverage</span>
                </div>
                <div className="homepage-stat-tile">
                  <strong>1 click</strong>
                  <span>Restore or download</span>
                </div>
              </div>
            </article>

            <article className="homepage-hero-card homepage-hero-card-secondary">
              <div className="homepage-step">
                <span className="homepage-step-index">01</span>
                <div>
                  <h3>Connect your Drive</h3>
                  <p>Authorize securely with Google and start protecting the folders that matter.</p>
                </div>
              </div>
              <div className="homepage-step">
                <span className="homepage-step-index">02</span>
                <div>
                  <h3>Capture scheduled snapshots</h3>
                  <p>Keep fresh backup copies without chasing manual export routines.</p>
                </div>
              </div>
              <div className="homepage-step">
                <span className="homepage-step-index">03</span>
                <div>
                  <h3>Recover on demand</h3>
                  <p>Restore folders fast when users need deleted or damaged files back.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="homepage-section homepage-section-alt">
        <div className="homepage-shell">
          <div className="homepage-section-heading">
            <p className="homepage-section-kicker">Productivity</p>
            <h2>How dBackUp keeps work moving</h2>
            <p>
              The product should feel like a calm safety net, not a wall of
              oversized blocks. These flows are the reasons people use it.
            </p>
          </div>

          <div className="homepage-story-grid">
            {productivityCards.map((card) => (
              <article className="homepage-story-card" key={card.title}>
                <img src={card.image} alt={card.alt} />
                <div className="homepage-story-content">
                  <p className="homepage-story-eyebrow">{card.eyebrow}</p>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-shell">
          <div className="homepage-section-heading">
            <p className="homepage-section-kicker">Trust</p>
            <h2>Built around practical security expectations</h2>
            <p>
              Backup products are trusted with important work. The interface
              should make that feel explicit instead of incidental.
            </p>
          </div>

          <div className="homepage-card-grid homepage-card-grid-three">
            {trustCards.map((card) => (
              <article className="homepage-info-card" key={card.title}>
                <div className="homepage-info-media">
                  <img src={card.image} alt={card.alt} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section homepage-section-alt">
        <div className="homepage-shell">
          <div className="homepage-section-heading">
            <p className="homepage-section-kicker">Features</p>
            <h2>Cloud backup tools without the visual clutter</h2>
            <p>
              Core features are now grouped into a balanced grid so the page
              reads like a product, not a stack of mismatched cards.
            </p>
          </div>

          <div className="homepage-card-grid homepage-card-grid-two">
            {featureCards.map((card) => (
              <article className="homepage-feature-card" key={card.title}>
                <img src={card.image} alt={card.alt} />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <div className="homepage-shell">
          <div className="homepage-section-heading">
            <p className="homepage-section-kicker">Why backup matters</p>
            <h2>Cloud backup protects against routine failures too</h2>
            <p>
              Loss events are not rare edge cases. The page should communicate
              urgency clearly, without resorting to cramped rows and oversized
              spacing.
            </p>
          </div>

          <div className="homepage-stat-grid">
            {riskStats.map((stat) => (
              <article className="homepage-risk-card" key={stat.value}>
                <img src={stat.image} alt={stat.alt} />
                <strong>{stat.value}</strong>
                <h3>{stat.label}</h3>
                <p>{stat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="homepage-cta-band">
        <div className="homepage-shell">
          <div className="homepage-cta-panel">
            <div>
              <p className="homepage-section-kicker homepage-section-kicker-light">
                Ready to protect your files?
              </p>
              <h2>
                Start a backup flow that looks cleaner and behaves like a real
                product.
              </h2>
              <p>
                Connect Google Drive to start capturing snapshots, or sign in if
                you already have protected folders waiting for recovery.
              </p>
            </div>

            <div className="homepage-cta-panel-actions">
              <Button
                radius="xl"
                className="homepage-connect-button homepage-connect-button-light"
                onClick={handleConnectNow}
              >
                <span>Connect Google Drive</span>
                <img src={driveLogo} alt="Google Drive logo" />
              </Button>

              <button
                type="button"
                className="homepage-google-button homepage-google-button-light"
                onClick={handleLoginNow}
                aria-label="Sign in with Google"
              >
                <img src={googleSignIn} alt="Sign in with Google" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <FooterLinks data={footerData} />
    </main>
  );
}

export default HomePage;
