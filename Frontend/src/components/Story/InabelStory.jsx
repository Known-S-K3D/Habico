import React from "react";
import "../../styles/story.css";

import inabelImg from "../../assets/inabel/inabel1.webp";
import inabelVideo from "../../assets/videos/inabel.mp4";
import iv2 from "../../assets/videos/inabel2.mp4";

// photography images
import inabel1 from "../../assets/inabel/inabel.jpg";
import inabel2 from "../../assets/inabel/inabel5.jpg";
import inabel3 from "../../assets/inabel/inabel4.jpg";
import inabel4 from "../../assets/inabel/inabel3.webp";

const InabelStory = () => {
  return (
    <div className="story-container">
      {/* 📸 Hero Section */}
      <div className="story-hero">
        <img src={inabelImg} alt="Inabel Weaving" className="story-hero-img" />
        <div className="story-hero-text">
          <h1>Inabel: Threads of Identity and Tradition</h1>
          <p>
            Preserving centuries-old Ilocano weaving heritage in the digital
            age.
          </p>
        </div>
      </div>

      {/* 🎥 Documentary Video 1 */}
      <div className="story-video-container">
        <video className="story-video" controls>
          <source src={inabelVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 📜 Full Story */}
      <div className="story-content">
        <h2>The Story of Inabel</h2>
        <p>
          Inabel, also known as Abel Iloko, is a deeply woven part of the
          cultural fabric of Northern Luzon, particularly in Ilocos Norte and
          Ilocos Sur. The word “abel” translates to “weave” in Ilocano, and the
          textiles that bear this name are more than just fabrics — they are
          living records of community, memory, and identity.
        </p>
        <p>
          Historically, Inabel was crafted from locally grown cotton, hand-spun
          and dyed with natural pigments derived from plants, roots, and bark.
          Weavers, often women, used wooden pedal looms called *pagablan* to
          interlace threads into geometric designs that echoed the rhythms of
          nature — rivers, stars, mountains — and mirrored Ilocano beliefs about
          balance and harmony.
        </p>
        <p>
          The weaving process was not just labor-intensive but deeply symbolic.
          Patterns carried meanings: diamonds (*binakol*) signified protection
          against malevolent spirits, while zigzag lines echoed the flowing
          rivers that sustained life. Every strand was a story, and every
          finished fabric was a collaboration between artisan and ancestry.
        </p>
        <p>
          During the Spanish colonial period, Inabel became a valuable trade
          good, used as currency and tribute. Over time, however,
          industrialization and mass-produced textiles led to a decline in
          traditional weaving. By the late 20th century, the craft was at risk
          of fading away entirely.
        </p>
        <p>
          Today, thanks to the dedication of master weavers, local cooperatives,
          and creative young designers, Inabel is experiencing a renaissance.
          Digital storytelling, e-commerce, and cultural tourism have brought
          global attention to these textiles. Once confined to rural households,
          Inabel is now reimagined into fashion pieces, home décor, and even art
          installations — while still honoring the spirit of its origin.
        </p>
        <p>
          As the world continues to globalize, the revival of Inabel is not just
          about fabric — it’s about identity, resilience, and continuity. Every
          thread woven today is a connection to centuries past and a promise to
          the generations yet to come.
        </p>
      </div>

      {/* 🎥 Documentary Video  2*/}
      <div className="story-video-container">
        <video className="story-video" controls>
          <source src={iv2} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* 📸 Photography Gallery Section */}
      <div className="photo-gallery">
        <h2>Photography: The Beauty of Inabel</h2>
        <div className="photo-grid">
          <img src={inabel1} alt="Inabel Weaving 1" />
          <img src={inabel2} alt="Inabel Weaving 2" />
          <img src={inabel3} alt="Inabel Weaving 3" />
          <img src={inabel4} alt="Inabel Weaving 4" />
        </div>
      </div>

      {/* 🔗 Learn More (Card Style) */}
      <div className="learn-more-section">
        <h3>Learn More</h3>
        <div className="learn-more-cards">
          <div className="learn-card">
            <h4>Atlas Obscura: The Story Behind Inabel Weaving</h4>
            <p>
              A fascinating look into the centuries-old weaving traditions of
              the Ilocano people and how Inabel textiles embody their history,
              identity, and artistry.
            </p>
            <a
              href="https://www.atlasobscura.com/articles/inabel-weaving-philippines"
              target="_blank"
              rel="noreferrer"
              className="learn-more-btn"
            >
              Visit Resource
            </a>
          </div>

          <div className="learn-card">
            <h4>Reviving the Ilocano Weaving Heritage</h4>
            <p>
              Learn how local weavers, cooperatives, and designers are bringing
              Inabel back to life — blending traditional techniques with modern
              design to preserve cultural heritage.
            </p>
            <a
              href="https://www.bangko.com.ph/blogs/inabel-weaving"
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

export default InabelStory;
