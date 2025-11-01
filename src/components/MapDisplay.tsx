import React, { useState, useMemo } from 'react';
import { mapData } from '../data/grottoData';
import MapAreaRow from './MapAreaRow';
import LandmarkFilter from './LandmarkFilter';

const MapDisplay: React.FC<{}> = () => {
  const [filterState, setFilterState] = useState<{ [key: string]: number }>({});

  const handleFilterChange = (landmarkId: string) => {
    setFilterState(prevState => {
      const currentState = prevState[landmarkId] || 0;
      const nextState = (currentState + 1) % 3;
      return { ...prevState, [landmarkId]: nextState };
    });
  };

  const handleReset = () => {
    setFilterState({});
  };

  const { filteredMapData, totalFound } = useMemo(() => {
    const includeFilters = Object.keys(filterState).filter(id => filterState[id] === 1);
    const excludeFilters = Object.keys(filterState).filter(id => filterState[id] === 2);

    if (includeFilters.length === 0 && excludeFilters.length === 0) {
      const count = mapData.reduce((sum, area) => sum + area.maps.length, 0);
      return { filteredMapData: mapData, totalFound: count };
    }

    let count = 0;
    const filteredData = mapData.map(area => {
      const filteredMaps = area.maps.filter(map => {
        const hasAllIncluded = includeFilters.every(filterId => map.landmarks.includes(filterId));
        const hasNoExcluded = !excludeFilters.some(filterId => map.landmarks.includes(filterId));
        return hasAllIncluded && hasNoExcluded;
      });
      
      count += filteredMaps.length;
      return { ...area, maps: filteredMaps };
    }).filter(area => area.maps.length > 0);

    return { filteredMapData: filteredData, totalFound: count };
  }, [filterState]);

  return (
    <div>
      <LandmarkFilter
        filterState={filterState}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
      />
      
      <div className="results-count">
        <h3>{totalFound} Treasure Maps Found</h3>
      </div>

      {filteredMapData.map(data => (
        <MapAreaRow key={data.area} data={data} />
      ))}
    </div>
  );
};

export default MapDisplay;