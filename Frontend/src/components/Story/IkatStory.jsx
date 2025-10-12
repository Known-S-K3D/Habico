import React from "react";
import "../../styles/story.css";

import ikatImg from "../../assets/ikat/ikat1.jpeg";
import ikatVideo from "../../assets/videos/ikat.mp4";

// photography images
import ikat1 from "../../assets/ikat/ikat2.jpg";
import ikat2 from "../../assets/ikat/ikat3.webp";
import ikat3 from "../../assets/ikat/ikat4.webp";
import ikat4 from "../../assets/ikat/ikat5.jpg";

const IkatStory = () => {
  return (
    <div className="story-container">
      {/* 📸 Hero Section */}
      <div className="story-hero">
        <img src={ikatImg} alt="Ikat Weaving" className="story-hero-img" />
        <div className="story-hero-text">
          <h1>Ikat: The Timeless Art of Resist-Dye Weaving</h1>
          <p>Where threads become stories before they’re even woven.</p>
        </div>
      </div>

      {/* 🎥 Documentary Video */}
      <div className="story-video-container">
        <video className="story-video" controls>
          <source src={ikatVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 📜 Full Story */}
      <div className="story-content">
        <h2>The Story of Ikat</h2>
        <p>
          Ikat — derived from the Malay-Indonesian word “mengikat,” meaning “to
          tie or bind” — is one of the world’s most ancient and intricate
          textile traditions. Unlike other weaving styles, Ikat’s magic happens
          *before* the loom: threads are meticulously dyed in sections while
          still unwoven, using a resist-dye technique that creates breathtaking
          patterns once the cloth takes form.
        </p>
        <p>
          Practiced in parts of Southeast Asia, South America, India, and the
          Philippines, Ikat embodies a philosophy of patience, foresight, and
          intentionality. Every motif must be visualized in reverse, mapped onto
          unwoven threads with precision. The process is painstaking — a single
          textile can take weeks or even months to complete — but the result is
          a piece of cloth imbued with cultural stories, spiritual meanings, and
          artistic brilliance.
        </p>
        <p>
          In the Philippines, Ikat weaving thrives among Indigenous communities
          such as the B’laan and T’boli, whose designs reflect cosmology,
          ancestral myths, and harmony with nature. The blurred edges that
          define Ikat patterns are not flaws but signatures of authenticity — a
          visual whisper of the human hands that guided the dye.
        </p>
        <p>
          Historically, Ikat was a marker of status and identity. Certain motifs
          were reserved for rituals, marriages, or leaders. During colonial
          times, these textiles were traded across oceans, admired for their
          complexity and beauty. Yet industrial production nearly erased this
          art form.
        </p>
        <p>
          Today, the global design world is rediscovering Ikat. Contemporary
          weavers blend ancestral patterns with modern aesthetics, and
          sustainable fashion brands are turning to traditional artisans to keep
          the craft alive. Each Ikat piece is not just fabric — it’s a narrative
          of resilience, memory, and cultural pride.
        </p>
      </div>

      {/* 📸 Photography Gallery Section */}
      <div className="photo-gallery">
        <h2>Photography: The Artistry of Ikat</h2>
        <div className="photo-grid">
          <img src={ikat1} alt="Ikat Weaving 1" />
          <img src={ikat2} alt="Ikat Weaving 2" />
          <img src={ikat3} alt="Ikat Weaving 3" />
          <img src={ikat4} alt="Ikat Weaving 4" />
        </div>
      </div>

      {/* 🔗 Learn More (Card Style) */}
      <div className="learn-more-section">
        <h3>Learn More</h3>
        <div className="learn-more-cards">
          <div className="learn-card">
            <h4>Textile Arts Center: The Ancient Art of Ikat</h4>
            <p>
              Dive deep into the traditional techniques of Ikat weaving,
              exploring how this intricate resist-dyeing method has shaped
              textile traditions across cultures and centuries.
            </p>
            <a
              href="https://textileartscenter.com/blogs/news/ikat-weaving-techniques"
              target="_blank"
              rel="noreferrer"
              className="learn-more-btn"
            >
              Visit Resource
            </a>
          </div>

          <div className="learn-card">
            <h4>HandEye Magazine: Meaning and Process of Ikat</h4>
            <p>
              Discover the cultural meanings and meticulous process behind Ikat
              weaving, from dyeing yarns to crafting symbolic patterns that tell
              ancestral stories.
            </p>
            <a
              href="https://handeyemagazine.com/content/ikat-meaning-and-process"
              target="_blank"
              rel="noreferrer"
              className="learn-more-btn"
            >
              Read Article
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IkatStory;
