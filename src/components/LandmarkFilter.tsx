import React from 'react';
import { landmarks } from '../data/grottoData';

// Define the types for the props
interface LandmarkFilterProps {
  filterState: { [key: string]: number }; // e.g., { water: 1, trees: 2 }
  onFilterChange: (landmarkId: string) => void;
  onReset: () => void;
}

const LandmarkFilter: React.FC<LandmarkFilterProps> = ({ filterState, onFilterChange, onReset }) => {
  const getBorderClass = (landmarkId: string) => {
    const state = filterState[landmarkId] || 0;
    if (state === 1) return 'filter-include'; // Green border
    if (state === 2) return 'filter-exclude'; // Red border
    return 'filter-off'; // Default border
  };

  return (
    <div className="filter-container">
      <div className="filter-help">
        <p>Click a landmark to filter: <span className="filter-include">Include</span>, <span className="filter-exclude">Exclude</span>, or Off.</p>
      </div>
      <div className="landmarks-grid">
        {landmarks.map(landmark => (
          <div
            key={landmark.id}
            className={`landmark-item ${getBorderClass(landmark.id)}`}
            onClick={() => onFilterChange(landmark.id)}
          >
            <img src={landmark.icon} alt={landmark.name} />
            <span>{landmark.name}</span>
          </div>
        ))}
      </div>
      <button onClick={onReset} className="reset-button">Reset</button>
    </div>
  );
};

export default LandmarkFilter;