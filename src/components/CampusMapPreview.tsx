import React, { useState } from 'react';
import { MapPin, Map, ExternalLink } from 'lucide-react';

interface CampusMapPreviewProps {
  planoUrl: string;
  ubicanosUrl: string;
  campusName: string;
  campusUrl: string;
}

const CampusMapPreview: React.FC<CampusMapPreviewProps> = ({ planoUrl, ubicanosUrl, campusName, campusUrl }) => {
  const [showPlano, setShowPlano] = useState(true);

  return (
    <div className="mt-4 border border-gray-600 rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-2 flex justify-between items-center">
        <span className="text-white font-semibold">Mapa de {campusName}</span>
        <div>
          <button 
            onClick={() => setShowPlano(true)} 
            className={`text-white mr-2 ${showPlano ? 'underline' : ''}`}
            aria-label="Ver plano interno"
          >
            <Map className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowPlano(false)} 
            className={`text-white mr-2 ${!showPlano ? 'underline' : ''}`}
            aria-label="Ver ubicación en Google Maps"
          >
            <MapPin className="w-5 h-5" />
          </button>
          <a 
            href={campusUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:text-cyan-400"
            aria-label={`Visitar página del campus ${campusName}`}
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="relative">
        {showPlano ? (
          <div className="relative w-full h-[300px] overflow-hidden">
            <img 
              src={planoUrl} 
              alt={`Plano del Campus ${campusName}`} 
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <iframe
            src={ubicanosUrl}
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={`Ubicación de ${campusName} en Google Maps`}
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default CampusMapPreview;