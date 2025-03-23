const About = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">About This Template</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          This React template provides a solid foundation for building modern web applications. 
          It includes all the essential tools and configurations to get you started quickly.
        </p>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Key Features</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Vite:</strong> Lightning fast build tool with HMR</li>
          <li><strong>React Router:</strong> Latest version with improved routing capabilities</li>
          <li><strong>TypeScript:</strong> Type safety for more robust code</li>
          <li><strong>TailwindCSS:</strong> Utility-first CSS framework</li>
          <li><strong>API Utilities:</strong> Hooks for data fetching and mutations</li>
        </ul>
        
        <p className="mt-4">
          Feel free to modify this template to suit your specific project needs.
        </p>
      </div>
    </div>
  );
};

export default About;
