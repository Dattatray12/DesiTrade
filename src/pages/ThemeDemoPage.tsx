import React from 'react';
import { ThemeShowcase } from '../components';

const ThemeDemoPage: React.FC = () => {
  return (
    <div className="container-responsive py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
            Theme System Demo
          </h1>
          <p className="text-lg text-neutral-600 dark:text-dark-text-secondary">
            Experience the beautiful dark and light themes of DesiTrade
          </p>
        </div>
        
        <ThemeShowcase />
        
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500 dark:text-dark-text-tertiary">
            The theme preference is automatically saved and will persist across browser sessions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemoPage;
