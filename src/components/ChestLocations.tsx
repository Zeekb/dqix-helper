import React from 'react';
import { chestLocations } from '../data/grottoData';
import { worldChestData } from '../data/grottoData';

const ChestLocations: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredLocations = chestLocations.filter(location =>
    location.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredWorldChestData = worldChestData.filter(rank =>
    rank.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div>
      <section>
        <h2>World Chests</h2>
        {filteredWorldChestData.map(rank => (
          <div key={`world-${rank.rank}`} className="rank">
            <h4>Rank {rank.rank}:</h4>
            <ul>
              {rank.items.map(item => (
                <li key={item.name}>{`${item.name} (${item.percentage}%)`}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section>
        <h2>Chest Locations</h2>
        <table>
          <thead>
            <tr>
              <th>Chest Rank</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredLocations.map((location, index) => (
              <tr key={index}>
                <td><b>{location.rank}</b></td>
                <td>{location.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default ChestLocations;