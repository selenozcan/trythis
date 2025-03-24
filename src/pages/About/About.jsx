import React from "react";
import "./about.css";
import AboutImage from "../../assets/about.jpg";
import { Link } from "react-router";

const About = () => {
  return (
    <main className="about-container">
      <section className="about-content">
        <Link to="/" className="about-link">
          &larr; <span>Back to Home</span>
        </Link>

        <img src={AboutImage} alt="About TryThis" className="about-image" />

        <h1>About TryThis</h1>
        <p>
          <strong>TryThis</strong> is an interactive web application designed to
          help users discover and complete new activities every day. Whether
          you're looking for a fun challenge, a new hobby, or a way to break
          your routine, TryThis provides a curated selection of daily activities
          to explore.
        </p>

        <h2>How It Works</h2>
        <ul>
          <li>
            🔄 <strong>Discover Activities</strong> – Swipe through a variety of
            suggested activities.
          </li>
          <li>
            ✅ <strong>Add to Today's Activities</strong> – Select an activity
            and commit to completing it.
          </li>
          <li>
            📅 <strong>Track Your Progress</strong> – Activities that are
            completed or missed are saved for future reference.
          </li>
          <li>
            🔎 <strong>View Past Activities</strong> – Keep a record of your
            completed and pending activities.
          </li>
        </ul>

        <h2>Why TryThis?</h2>
        <p>
          Many people struggle to find motivation for daily activities. TryThis
          offers an easy way to explore new challenges,{" "}
          <strong>form good habits</strong>, and <strong>stay engaged</strong>{" "}
          in your daily life. With a clean UI and seamless user experience, it
          makes trying something new effortless and fun!
        </p>

        <h2>Features</h2>
        <ul>
          <li>
            ✨ <strong>Beautiful and responsive UI</strong>
          </li>
          <li>
            🔥 <strong>Interactive swipe-based activity selection</strong>
          </li>
          <li>
            📌 <strong>Daily activity tracking system</strong>
          </li>
          <li>
            📊 <strong>Past activity log for self-reflection</strong>
          </li>
          <li>
            🔐{" "}
            <strong>Firebase authentication for personalized experience</strong>
          </li>
        </ul>

        <h2>Technologies Used</h2>
        <p>TryThis is built using modern web technologies:</p>
        <ul>
          <li>
            ⚛️ <strong>React</strong> – For dynamic UI components.
          </li>
          <li>
            🎨 <strong>CSS</strong> – For styling.
          </li>
          <li>
            🔥 <strong>Firebase</strong> – For authentication and database
            management.
          </li>
          <li>
            🚀 <strong>Vercel</strong> – For fast deployment.
          </li>
        </ul>

        <p className="final-note">
          Start exploring now and <strong>TryThis</strong> – because every day
          is an opportunity for something new!
        </p>
      </section>
    </main>
  );
};

export default About;
