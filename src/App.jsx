import React, { useState, useEffect } from 'react';

// TypewriterText component for animated text
const TypewriterText = ({ text, delay = 100, infinite = false }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      // Loop back if infinite is true
      timeout = setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText('');
      }, 1000); // Delay before restarting
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}</span>;
};


// Main App component
const App = () => {
  // State to manage mobile navigation open/close
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to toggle mobile navigation
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close nav when screen resizes to desktop or when a nav link is clicked
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint in Tailwind
        setIsNavOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Header Section */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto flex items-center justify-between p-4 md:px-6 lg:px-8">
          {/* Logo/Name */}
          <a href="#" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md">
            SmitJaiswal.dev
          </a>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={toggleNav}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isNavOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isNavOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#home" text="Home" onClick={() => setIsNavOpen(false)} />
            <NavLink href="#about" text="About" onClick={() => setIsNavOpen(false)} />
            <NavLink href="#experience" text="Experience" onClick={() => setIsNavOpen(false)} />
            <NavLink href="#portfolio" text="Portfolio" onClick={() => setIsNavOpen(false)} />
            <NavLink href="#contact" text="Contact" onClick={() => setIsNavOpen(false)} />
            <a
              href="/Smit Jaiswal Resume Bi Projects.docx" // !!! REPLACE THIS WITH YOUR RESUME'S ACTUAL URL !!!
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              Download Resume
            </a>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isNavOpen && (
          <div id="mobile-menu" className="md:hidden bg-white shadow-lg pb-4">
            <div className="flex flex-col items-center space-y-4 pt-4">
              <NavLink href="#home" text="Home" onClick={() => setIsNavOpen(false)} />
              <NavLink href="#about" text="About" onClick={() => setIsNavOpen(false)} />
              <NavLink href="#experience" text="Experience" onClick={() => setIsNavOpen(false)} />
              <NavLink href="#portfolio" text="Portfolio" onClick={() => setIsNavOpen(false)} />
              <NavLink href="#contact" text="Contact" onClick={() => setIsNavOpen(false)} />
              <a
                href="Smit Jaiswal Resume Bi Projects.docx" // !!! REPLACE THIS WITH YOUR RESUME'S ACTUAL URL !!!
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Download Resume
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative flex items-center justify-center h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white overflow-hidden pt-16">
        {/* Background Shapes for Creativity */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <circle cx="20" cy="20" r="15" fill="currentColor" className="text-indigo-400 animate-pulse" style={{ animationDelay: '0s' }} />
            <circle cx="80" cy="40" r="20" fill="currentColor" className="text-purple-400 animate-pulse" style={{ animationDelay: '1s' }} />
            <rect x="10" y="70" width="25" height="25" fill="currentColor" className="text-indigo-300 animate-pulse" style={{ animationDelay: '2s' }} />
            <polygon points="70,70 90,80 70,90" fill="currentColor" className="text-purple-300 animate-pulse" style={{ animationDelay: '3s' }} />
          </svg>
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Hi, I'm <span className="text-yellow-300"><TypewriterText text="Smit Jaiswal" delay={100} /></span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            A Data Analyst & Power BI Specialist
          </p>
          <a
            href="#portfolio"
            className="inline-block bg-white text-indigo-700 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out animate-fade-in-up focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            View My Work
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">About Me</h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
              {/* Your professional photo */}
              <img
                src="/Profile_photo.JPG" // Your uploaded image URL
                alt="Smit Jaiswal's Professional Photo"
                className="rounded-full shadow-xl border-4 border-indigo-200 w-64 h-64 md:w-80 md:h-80 object-cover object-top" // Adjusted object-fit and object-position
              />
            </div>
            <div className="md:w-2/3 text-lg text-gray-700 leading-relaxed">
              <p className="mb-4">
                I am a passionate and results-driven Data Analyst with a strong focus on transforming raw data into actionable insights. My expertise lies in leveraging Power BI to create dynamic, interactive, and visually compelling dashboards that empower data-driven decision-making.
              </p>
              <p className="mb-4">
                With a background in Data Analytics, I excel at data cleaning, modeling, and visualization. I am proficient in key tools such as SQL, Excel, Python, Power Query, and DAX. My goal is to bridge the gap between complex data and clear, understandable narratives.
              </p>
              <p>
                I am constantly exploring new tools and techniques to enhance my analytical capabilities and deliver impactful solutions.
              </p>
              <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-3">
                <SkillTag text="Power BI" />
                <SkillTag text="DAX" />
                <SkillTag text="Power Query" />
                <SkillTag text="SQL" />
                <SkillTag text="Excel" />
                <SkillTag text="Data Modeling" />
                <SkillTag text="Data Visualization" />
                <SkillTag text="Storytelling" />
                {/* Add more skills as needed */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 sm:py-20 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">My Experience</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Experience Item 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Software Application Developer</h3>
              <p className="text-indigo-600 font-medium">Tax Tech India Pvt Ltd. | Jan 2022 - Dec 2024</p>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                <li>Designed, coded, tested, and debugged software applications while adhering to best practices.</li>
                <li>Conducted thorough analyses of project requirements and proposed effective technical solutions.</li>
                <li>Worked with cross-functional teams (designers, project managers, QA) and contributed to project success.</li>
                <li> Identified and resolved technical issues promptly, ensuring minimal disruption to project timelines.</li>
                <li>Proficient in various software development tools and platforms, staying updated with industry trends.</li>
              </ul>
            </div>
            {/* Experience Item 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Data Engineer Intern</h3>
              <p className="text-indigo-600 font-medium">Mayk Ideas | Internship</p>
              <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                <li>Led the "Inventory Tracking Asset and Service Modernization Project," delivering end-to-end Power BI dashboards with Team & Manager views.</li>
                <li>Integrated real-time data using Microsoft Dataverse, ensuring seamless data connectivity across systems.</li>
                <li>Built DAX-based KPIs and advanced analytics to support data-driven decision-making.</li>
                <li>Created wireframes, Entity Relationship Diagrams (ERD), and structured technical documentation.</li>
                <li>Solved real-world challenges including data connectivity issues and system integration complexities.</li>
              </ul>
            </div>
            {/* Add more experience items as needed */}
          </div>
        </div>
      </section>

      {/* Portfolio/Projects Section */}
      <section id="portfolio" className="py-16 sm:py-20 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">My Data Dashboards</h2>
          <p className="text-center text-lg text-gray-700 mb-10 max-w-3xl mx-auto">
            Below are some of my key data visualization projects built with Power BI and Tableau. Each project demonstrates my ability to transform data into meaningful insights.
            <br />
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1: Power BI - Credit Card Analysis */}
            <ProjectCard
              title="Credit Card Analysis (Power BI)"
              description="An in-depth analysis of credit card data, revealing spending patterns, risk factors, and customer segmentation for strategic financial insights."
              dashboardUrl="https://app.powerbi.com/reportEmbed?reportId=cdafcf5c-4404-4232-9c97-73711834704c&autoAuth=true&embeddedDemo=true"
              platform="Power BI"
            />

            {/* Project Card 2: Power BI - Warehouse Inventory */}
            <ProjectCard
              title="Warehouse Inventory (Power BI)"
              description="A dashboard designed to monitor inventory levels, track stock movement, and optimize supply chain efficiency for Warehouse A2."
              dashboardUrl="https://app.powerbi.com/reportEmbed?reportId=a5abbf0f-cde7-46c4-a629-5e11ab20e9b6&autoAuth=true&embeddedDemo=true"
              platform="Power BI"
            />

            {/* Add more Project Cards as needed */}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">Get In Touch</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex flex-col items-center space-y-6">
            <a
              href="mailto:smitjaiswal2001@gmail.com"
              className="inline-flex items-center bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v7a2 2 0 002 2h14a2 2 0 002-2v-7m-18 0l-2-2m20 2l2-2"></path></svg>
              smitjaiswal2001@gmail.com
            </a>
            <div className="flex space-x-6">
              <SocialLink
                href="https://www.linkedin.com/in/smit-jaiswal-988360238/"
                icon="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z"
                label="LinkedIn"
              />
              <SocialLink
                href="https://github.com/smitjaiswal2001"
                icon="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.381 1.236-3.221-.124-.3-.535-1.524.117-3.176 0 0 1-.322 3.293 1.236.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.292-1.558 3.292-1.236 3.292-1.236.653 1.653.242 2.876.118 3.176.771.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.564 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                label="GitHub"
              />
              {/* Add more social links as needed */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Smit Jaiswal. All rights reserved.</p>
          <p className="mt-2">Built with React and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

// Reusable NavLink component
const NavLink = ({ href, text, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-gray-700 hover:text-indigo-600 font-medium transition duration-300 ease-in-out px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    {text}
  </a>
);

// Reusable SkillTag component
const SkillTag = ({ text }) => (
  <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
    {text}
  </span>
);

// Reusable ProjectCard component
const ProjectCard = ({ title, description, dashboardUrl, platform }) => {
  const [isReportLoaded, setIsReportLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading spinner

  const handleLoadReport = () => {
    setIsLoading(true); // Start loading
    // A small delay to allow spinner to show before iframe starts fetching
    setTimeout(() => {
      setIsReportLoaded(true);
    }, 100);
  };

  const handleIframeLoad = () => {
    setIsLoading(false); // Stop loading when iframe content is ready
  };

  // Determine placeholder image based on platform
  const previewImageUrl = platform === "Tableau"
    ? "https://placehold.co/400x225/FFC000/FFFFFF?text=Tableau+Dashboard+Preview"
    : "https://placehold.co/400x225/E0E7FF/6366F1?text=Power+BI+Report+Preview";

  const errorImageUrl = platform === "Tableau"
    ? "https://placehold.co/400x225/FF9900/FFFFFF?text=Tableau+Load+Error"
    : "https://placehold.co/400x225/E0E7FF/6366F1?text=Power+BI+Report+Error";


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl border border-gray-200">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
        {!isReportLoaded ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 text-gray-600 text-center p-4 rounded-t-lg">
             //<p>Click to load interactive {platform} dashboard</p>
            <button
              onClick={handleLoadReport}
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label={`Load interactive dashboard for ${title}`}
            >
              Load Dashboard
            </button>
            <img
              src={previewImageUrl}
              alt={`Preview of ${title} ${platform} Dashboard`}
              className="mt-4 w-3/4 mx-auto rounded-lg"
            />
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 z-10 rounded-t-lg">
                {/* Simple Spinner */}
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="ml-4 text-indigo-700">Loading dashboard...</p>
              </div>
            )}
            <iframe
              key={dashboardUrl} // Use key to force re-render when src changes
              title={title}
              width="100%"
              height="100%"
              src={dashboardUrl}
              frameBorder="0"
              allowFullScreen={true}
              className="absolute top-0 left-0 w-full h-full rounded-t-lg"
              onLoad={handleIframeLoad} // Call when iframe content is loaded
              onError={(e) => {
                setIsLoading(false); // Stop loading on error
                e.currentTarget.style.display = 'none'; // Hide the iframe
                const parent = e.currentTarget.parentElement;
                const fallbackDiv = document.createElement('div');
                fallbackDiv.className = 'absolute inset-0 flex flex-col items-center justify-center bg-gray-200 text-gray-600 text-center p-4 rounded-t-lg';
                fallbackDiv.innerHTML = `
                  <p class="mb-2">Could not load ${platform} dashboard.</p>
                  <p class="text-sm">Please ensure the embed URL is correct and public.</p>
                  <img src="${errorImageUrl}" alt="${platform} Dashboard Load Error" class="mt-4 w-3/4 mx-auto rounded-lg" />
                `;
                parent.appendChild(fallbackDiv);
              }}
            ></iframe>
          </>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-700 text-base leading-relaxed">{description}</p>
        <a
          href={dashboardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label={`View ${title} ${platform} dashboard in fullscreen`}
        >
          View Fullscreen
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </a>
      </div>
    </div>
  );
};

// Reusable SocialLink component
const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-indigo-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    aria-label={label}
  >
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d={icon} />
    </svg>
  </a>
);

export default App;
