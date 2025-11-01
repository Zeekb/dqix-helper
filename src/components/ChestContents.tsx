import React from 'react';
import { grottoChestData } from '../data/grottoData';

const ChestContents: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGrottoChestData = grottoChestData.filter(rank =>
    rank.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <section>
        <h2>Grotto Chest Contents</h2>
        {filteredGrottoChestData.map(rank => (
          <div key={`grotto-${rank.rank}`} className="rank">
            <h4>Rank {rank.rank}:</h4>
            <ul>
              {rank.items.map(item => (
                <li key={item.name}>{`${item.name} (${item.percentage}%)`}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ChestContents;