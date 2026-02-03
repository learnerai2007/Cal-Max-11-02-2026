import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-600 hover:bg-brand-700 text-white shadow-md focus:ring-brand-500 border border-transparent",
    secondary: "bg-brand-100 text-brand-900 hover:bg-brand-200 focus:ring-brand-500 border border-transparent dark:bg-brand-900/30 dark:text-brand-100 dark:hover:bg-brand-900/50",
    outline: "border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-surface focus:ring-gray-400",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-gray-900 dark:hover:text-white focus:ring-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-md focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2 -ml-1">{icon}</span>}
      {children}
    </button>
  );
};