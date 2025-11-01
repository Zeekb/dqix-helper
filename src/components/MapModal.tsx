// src/components/MapModal.tsx

import React from 'react';
import './MapModal.css';

interface MapModalProps {
  mapId: string | null;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ mapId, onClose }) => {
  if (!mapId) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>
        <img src={`./maps/${mapId}.png`} alt={`Map ${mapId}`} />
      </div>
    </div>
  );
};

export default MapModal;