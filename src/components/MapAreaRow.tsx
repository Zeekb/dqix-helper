import React, { useState } from 'react';

// (Interface definitions remain the same)
interface MapInfo {
  id: string;
  x: number;
  y: number;
}
interface MapData {
  area: string;
  image: string;
  dimensions: {
    width: number;
    height: number;
  };
  maps: MapInfo[];
}
interface MapAreaRowProps {
  data: MapData;
}
interface HoveredMap {
  id: string;
  x: number;
  y: number;
}


const MapAreaRow: React.FC<MapAreaRowProps> = ({ data }) => {
  const [hoveredMap, setHoveredMap] = useState<HoveredMap | null>(null);
  // --- NEW --- Add state to track if the row is being interacted with
  const [isRowActive, setIsRowActive] = useState(false);

  const previewSize = 145 * 1.50;
  const previewOffset = previewSize / 2;

  return (
    // --- NEW --- Conditionally add an 'active' class to the entire row
    <div className={`map-row ${isRowActive ? 'active' : ''}`}>
      <div className="area-container">
        <img src={data.image} alt={data.area} className="area-image" />
        <svg
          className="svg-overlay"
          viewBox={`0 0 ${data.dimensions.width} ${data.dimensions.height}`}
        >
          {/* Layer for Hotspots */}
          {data.maps.map(map => (
            <rect
              key={map.id}
              className="map-hotspot"
              x={map.x - 35}
              y={map.y - 35}
              width="100"
              height="100"
              // --- NEW --- Update events to set the row as active
              onMouseEnter={() => {
                setHoveredMap(map);
                setIsRowActive(true);
              }}
              onMouseLeave={() => {
                setHoveredMap(null);
                setIsRowActive(false);
              }}
            />
          ))}

          {/* Layer for the Preview Image */}
          {hoveredMap && (
            <image
              className="map-preview-image"
              href={`./maps/${hoveredMap.id}.png`}
              x={hoveredMap.x - previewOffset}
              y={hoveredMap.y - previewOffset}
              width={previewSize}
              height={previewSize}
            />
          )}
        </svg>
      </div>

      <div className="grotto-maps-container">
        {data.maps.map(mapInfo => (
          <img
            key={mapInfo.id}
            src={`./maps/${mapInfo.id}.png`}
            alt={`Map ${mapInfo.id}`}
            className={`grotto-map-img ${
              hoveredMap?.id === mapInfo.id ? 'highlighted' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MapAreaRow;