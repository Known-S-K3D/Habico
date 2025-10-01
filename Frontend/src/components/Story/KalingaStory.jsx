import React from "react";
import "../../styles/story.css";

import kalingaImg from "../../assets/kalinga/kalinga1.webp";
import kalingaVideo from "../../assets/videos/kalinga.mp4";

// photography images
import kalinga1 from "../../assets/kalinga/kalinga2.webp";
import kalinga2 from "../../assets/kalinga/kalinga3.webp";
import kalinga3 from "../../assets/kalinga/kalinga4.jpeg";
import kalinga4 from "../../assets/kalinga/kalinga5.webp";

const KalingaStory = () => {
  return (
    <div className="story-container">
      {/* 📸 Hero Section */}
      <div className="story-hero">
        <img
          src={kalingaImg}
          alt="Kalinga Weaving"
          className="story-hero-img"
        />
        <div className="story-hero-text">
          <h1>Kalinga Weaving: Threads of Ancestry and Pride</h1>
          <p>A living tradition woven from mountains, myths, and memory.</p>
        </div>
      </div>

      {/* 🎥 Documentary Video */}
      <div className="story-video-container">
        <video className="story-video" controls>
          <source src={kalingaVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 📜 Full Story */}
      <div className="story-content">
        <h2>The Story of Kalinga Weaving</h2>
        <p>
          In the heart of the Cordillera mountains, the Kalinga people continue
          one of the Philippines’ most vibrant textile traditions. Kalinga
          weaving is more than artistry — it is identity woven into cloth, a
          tapestry of ancestral memory, community values, and the sacred
          relationship between humanity and nature.
        </p>
        <p>
          Traditionally woven by women on backstrap looms, Kalinga textiles are
          known for their bold red, black, and white stripes, geometric motifs,
          and intricate borders. Each design carries symbolic meaning: diamonds
          symbolize fertility, zigzags depict flowing rivers, and repeated lines
          represent unity and continuity within the tribe.
        </p>
        <p>
          Historically, woven textiles were integral to Kalinga social life.
          They were used as garments, dowries, offerings, and markers of social
          status. Special patterns were reserved for tribal leaders or warriors,
          and weaving itself was considered a sacred duty passed down through
          generations.
        </p>
        <p>
          Colonialism and modernity challenged these traditions, but Kalinga
          weaving endured. Today, master weavers and young artisans are
          revitalizing the craft by blending traditional patterns with
          contemporary applications — from fashion collections to home décor and
          cultural exhibitions.
        </p>
        <p>
          As the world seeks sustainable, meaningful craftsmanship, Kalinga
          weaving stands as a testament to cultural resilience. Each fabric is a
          dialogue between past and present, a declaration that heritage is not
          a relic but a living force — woven, worn, and proudly shared with the
          world.
        </p>
      </div>

      {/* 📸 Photography Gallery Section */}
      <div className="photo-gallery">
        <h2>Photography: The Spirit of Kalinga Weaving</h2>
        <div className="photo-grid">
          <img src={kalinga1} alt="Kalinga Weaving 1" />
          <img src={kalinga2} alt="Kalinga Weaving 2" />
          <img src={kalinga3} alt="Kalinga Weaving 3" />
          <img src={kalinga4} alt="Kalinga Weaving 4" />
        </div>
      </div>

      {/* 🔗 Learn More (Card Style) */}
      <div className="learn-more-section">
        <h3>Learn More</h3>
        <div className="learn-more-cards">
          <div className="learn-card">
            <h4>NCCA: Cultural Profile of Kalinga Weaving</h4>
            <p>
              Explore the rich heritage, cultural practices, and evolution of
              Kalinga weaving through the official profile by the National
              Commission for Culture and the Arts.
            </p>
            <a
              href="https://ncca.gov.ph/about-culture-and-arts/culture-profile/kalinga/"
              target="_blank"
              rel="noreferrer"
              className="learn-more-btn"
            >
              Visit Resource
            </a>
          </div>

          <div className="learn-card">
            <h4>PIA Feature: Kalinga Weaving as Cultural Heritage</h4>
            <p>
              Learn how Kalinga weaving has been preserved and celebrated as a
              vital cultural heritage, sustaining indigenous identity and
              craftsmanship.
            </p>
            <a
              href="https://pia.gov.ph/features/2023/05/25/kalinga-weaving-cultural-heritage"
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

export default KalingaStory;
