function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 md:p-16 text-left">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        About $Game
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          This is a template for building decentralized web applications using React and AR.IO.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          $Game represents the next generation of decentralized gaming, built on cutting-edge 
          technologies that ensure true ownership, transparency, and community governance.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          Key Features
        </h2>
        <ul className="space-y-4">
          <li className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <strong className="text-blue-800 dark:text-blue-300">Decentralized Architecture:</strong> 
            <span className="text-gray-700 dark:text-gray-300 ml-2">
              Built on AR.IO for permanent, censorship-resistant storage
            </span>
          </li>
          <li className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <strong className="text-green-800 dark:text-green-300">Modern UI/UX:</strong>
            <span className="text-gray-700 dark:text-gray-300 ml-2">
              Responsive design with dark mode support
            </span>
          </li>
          <li className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
            <strong className="text-purple-800 dark:text-purple-300">Community Driven:</strong>
            <span className="text-gray-700 dark:text-gray-300 ml-2">
              Open source and built for the community
            </span>
          </li>
        </ul>
        
        <div className="text-center mt-12">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
