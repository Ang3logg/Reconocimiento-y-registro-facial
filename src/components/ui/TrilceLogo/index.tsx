import React from 'react';
import './styles.css';

export function TrilceLogo() {
  return (
    <div className="trilce-logo-container">
      <div className="trilce-shield">
        <div className="shield-top"></div>
        <div className="shield-bottom"></div>
      </div>
      <div className="trilce-text">
        <span className="text-trilce">Trilce</span>
        <span className="text-ucv">UCV</span>
      </div>
    </div>
  );
}