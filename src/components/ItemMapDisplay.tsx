import React, { useState, useRef } from 'react';

const ItemMapDisplay: React.FC<{}> = () => {
  // State for the magnifier
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setImgDimensions] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);
  const [[bgX, bgY], setBgPosition] = useState([0, 0]);

  const imgRef = useRef<HTMLImageElement>(null);

  // Define magnifier properties
  const magnifierHeight = 150;
  const magnifierWidth = 150;
  const zoomLevel = 1.5;

  const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;
    const { width, height } = imgRef.current.getBoundingClientRect();
    setImgDimensions([width, height]);
    setShowMagnifier(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;
    const { top, left } = imgRef.current.getBoundingClientRect();
    
    const rawX = e.pageX - left - window.pageXOffset;
    const rawY = e.pageY - top - window.pageYOffset;
    setXY([rawX, rawY]);

    const idealBgX = -rawX * zoomLevel + magnifierWidth / 2;
    const idealBgY = -rawY * zoomLevel + magnifierHeight / 2;

    const minBgX = -(imgWidth * zoomLevel - magnifierWidth);
    const maxBgX = 0;
    const minBgY = -(imgHeight * zoomLevel - magnifierHeight);
    const maxBgY = 0;

    const clampedBgX = Math.max(minBgX, Math.min(idealBgX, maxBgX));
    const clampedBgY = Math.max(minBgY, Math.min(idealBgY, maxBgY));

    setBgPosition([clampedBgX, clampedBgY]);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  return (
    <div className="itemmap-container">
      <img
        ref={imgRef}
        className="itemmap-image"
        src="item_map.webp"
        alt="items"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {showMagnifier && (
        <div
          style={{
              position: 'absolute',
              pointerEvents: 'none',
              height: `${magnifierHeight}px`,
              width: `${magnifierWidth}px`,
              top: `${y - magnifierHeight / 2.5}px`,
              left: `${x - magnifierWidth / 2}px`,
              opacity: '1',
              border: '3px solid lightgray',
              backgroundColor: 'white',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundImage: `url(item_map.webp)`,
                backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                backgroundPosition: `${bgX}px ${bgY}px`,
                height: '100%',
                width: '100%',
              }}
            />
        </div>
      )}
    </div>
  );
};

export default ItemMapDisplay;