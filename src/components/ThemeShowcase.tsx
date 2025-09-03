import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Card, Button, Badge, Input } from './index';

const ThemeShowcase: React.FC = () => {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      {/* Theme Controls */}
      <Card title="Theme Controls" className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium transition-colors duration-300 ${
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
            }`}>
              Current Theme:
            </span>
            <Badge 
              className={`${
                theme === 'dark' 
                  ? 'bg-dark-bg-accent text-dark-text-primary' 
                  : 'bg-primary-100 text-primary-800'
              }`}
            >
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button onClick={toggleTheme} variant="primary" size="sm">
              Toggle Theme
            </Button>
            <Button 
              onClick={() => setTheme('light')} 
              variant={theme === 'light' ? 'primary' : 'outline'} 
              size="sm"
            >
              Light
            </Button>
            <Button 
              onClick={() => setTheme('dark')} 
              variant={theme === 'dark' ? 'primary' : 'outline'} 
              size="sm"
            >
              Dark
            </Button>
          </div>
        </div>
      </Card>

      {/* UI Elements Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Buttons Showcase */}
        <Card title="Button Variants">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">Primary</Button>
              <Button variant="secondary" size="sm">Secondary</Button>
              <Button variant="outline" size="sm">Outline</Button>
              <Button variant="ghost" size="sm">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="success" size="sm">Success</Button>
              <Button variant="danger" size="sm">Danger</Button>
            </div>
          </div>
        </Card>

        {/* Form Elements */}
        <Card title="Form Elements">
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-700'
              }`}>
                Sample Input
              </label>
              <Input 
                placeholder="Enter text here..."
                className={`transition-colors duration-300 ${
                  theme === 'dark' 
                    ? 'border-dark-border-secondary bg-dark-bg-tertiary text-dark-text-primary placeholder-dark-text-tertiary' 
                    : 'border-neutral-300 bg-white text-neutral-900 placeholder-neutral-500'
                }`}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="primary" size="sm">Submit</Button>
              <Button variant="outline" size="sm">Cancel</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Badges and Status */}
      <Card title="Status Indicators">
        <div className="flex flex-wrap gap-3">
          <Badge className="badge-success">Success</Badge>
          <Badge className="badge-danger">Error</Badge>
          <Badge className="badge-warning">Warning</Badge>
          <Badge className="badge-secondary">Info</Badge>
        </div>
      </Card>

      {/* Color Palette */}
      <Card title="Theme Color Palette">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-primary-500 mb-2"></div>
            <span className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
            }`}>Primary</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-secondary-500 mb-2"></div>
            <span className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
            }`}>Secondary</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-success-500 mb-2"></div>
            <span className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
            }`}>Success</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-lg bg-danger-500 mb-2"></div>
            <span className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
            }`}>Danger</span>
          </div>
        </div>
      </Card>

      {/* Theme Info */}
      <Card title="Theme Information">
        <div className={`space-y-2 text-sm transition-colors duration-300 ${
          theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
        }`}>
          <p>
            <strong>Current Theme:</strong> {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </p>
          <p>
            <strong>Background:</strong> {theme === 'dark' ? 'Dark Blue-Gray' : 'Light Neutral'}
          </p>
          <p>
            <strong>Text:</strong> {theme === 'dark' ? 'Light Text' : 'Dark Text'}
          </p>
          <p>
            <strong>Accent:</strong> {theme === 'dark' ? 'Blue Accents' : 'Primary Colors'}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ThemeShowcase;
