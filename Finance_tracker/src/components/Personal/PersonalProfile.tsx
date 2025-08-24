import { Linkedin, Mail, Github, Rss } from "lucide-react";
import { useAuthStore } from "../../stores/AuthStore";
import { useTranslation } from "react-i18next";

const PersonalProfile = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const username = user?.user_metadata?.display_name || t("displayUserName");

  return (
    // MOCKUP TEMPLATE TO TEST RESPONSIVNESS
    <div className="max-w-4xl w-full bg-white overflow-hidden transform transition-all duration-300">
      {/* Main Content Area */}
      <div className="py-8 md:px-6 sm:px-10 text-center">
        <div className="relative bg-gradient-to-r flex justify-center items-center h-48 sm:h-64">
          <img
            src="https://placehold.co/400x400/222222/FFFFFF?text=Profile"
            alt="Profile Picture"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
        {/* Name and Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
          {username}
        </h1>
        <p className="text-lg text-purple-600 font-semibold mb-6">
          Web Developer & Digital Creator
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mb-8">
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            <Mail size={28} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            <Github size={28} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            <Rss size={28} />
          </a>
        </div>

        {/* About Me Section */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-purple-500 pb-1">
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">
            As a forward-thinking developer, I specialize in crafting elegant
            and robust web applications with a focus on user-centric design. My
            passion lies in solving complex problems and building intuitive,
            scalable solutions that enhance the digital experience. I am
            currently exploring the intersection of AI and front-end
            development, constantly seeking new challenges to expand my skill
            set and contribute to innovative projects.
          </p>
        </div>

        {/* Skills Section */}
        <div className="text-left mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-purple-500 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              JavaScript
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              React
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Tailwind CSS
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Node.js
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Figma
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Python
            </span>
            <span className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
              Git
            </span>
          </div>
        </div>

        <div className="text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-3 border-b-2 border-purple-500 pb-1">
            Latest Project
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              Quantum Analytics Dashboard
            </h3>
            <p className="text-gray-600 mb-3">
              Developed a cutting-edge data visualization platform for analyzing
              complex financial metrics. The dashboard features real-time data
              streaming, customizable charts, and a responsive interface for
              both mobile and desktop use.
            </p>
            <span className="text-sm font-medium text-purple-600">
              Technologies: React, D3.js, Redux, Firebase
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
