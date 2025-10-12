import React from "react";
import { Facebook, Mail } from "lucide-react";
import "../styles/About.css";

const teamMembers = [
  {
    name: "Vhenedick Nolasco",
    facebook: "https://www.facebook.com/vhenedick00",
    email: "nolascojl283@gmail.com",
  },
  {
    name: "Shine Faith Anol",
    facebook: "https://www.facebook.com/Shine.anol03",
    email: "anolsg282@gmail.com",
  },
  {
    name: "Renz Capagcuan",
    facebook: "https://www.facebook.com/renz.capagcuan.0",
    email: "capagcuanrenz13@gmail.com",
  },
];

const About = () => {
  return (
    <div className="about-container min-h-screen bg-gray-50 py-16 px-6 md:px-20 flex flex-col items-center">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-5xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-blue-600">Habico</span>
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            <strong>Habico</strong> is a modern and intelligent platform built to
            simplify operations, streamline workflows, and promote innovation.
            Designed for both businesses and individuals, Habico delivers
            reliable automation, insightful analytics, and seamless
            connectivity — all in one user-friendly space.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-blue-50 p-6 rounded-xl mb-10 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-2">
            Our Mission
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            To redefine productivity through technology by making complex
            processes simpler, smarter, and faster. Habico aims to empower users
            with innovative tools that foster efficiency and growth.
          </p>
        </div>

        {/* Tagline */}
        <p className="text-center text-lg font-semibold italic text-gray-800 mb-12">
          “Habico – Simplify. Optimize. Thrive.”
        </p>

        {/* Team Section */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-xl shadow hover:shadow-md transition text-center"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{member.email}</p>
              <div className="flex justify-center gap-5">
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition"
                >
                  <Facebook size={28} />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Mail size={28} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          © {new Date().getFullYear()} Habico. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default About;
