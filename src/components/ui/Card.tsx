import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  header,
  footer,
  padding = 'md',
  hover = true
}) => {
  const { theme } = useTheme();
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover ? 'hover:shadow-medium dark:hover:shadow-dark-medium' : '';
  
  return (
    <div className={`rounded-xl border transition-all duration-300 ${paddingClasses[padding]} ${hoverClasses} ${className} ${
      theme === 'dark'
        ? 'bg-dark-bg-secondary border-dark-border-primary shadow-dark-soft'
        : 'bg-white border-neutral-200 shadow-soft'
    }`}>
      {(title || subtitle || header) && (
        <div className={`border-b pb-4 mb-4 ${
          theme === 'dark' ? 'border-dark-border-secondary' : 'border-neutral-200'
        }`}>
          {header ? (
            header
          ) : (
            <>
              {title && <h2 className={`text-xl font-semibold mb-1 transition-colors duration-300 ${
                theme === 'dark' ? 'text-dark-text-primary' : 'text-neutral-900'
              }`}>{title}</h2>}
              {subtitle && <p className={`transition-colors duration-300 ${
                theme === 'dark' ? 'text-dark-text-secondary' : 'text-neutral-600'
              }`}>{subtitle}</p>}
            </>
          )}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className={`border-t pt-4 mt-4 ${
          theme === 'dark' ? 'border-dark-border-secondary' : 'border-neutral-200'
        }`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
