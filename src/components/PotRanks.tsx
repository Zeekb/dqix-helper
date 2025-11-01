import React from 'react';
import { potData } from '../data/grottoData';

const PotRanks: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredPotData = potData.filter(rank =>
    rank.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section>
      <h2>Ranks of pots</h2>
      {filteredPotData.map(rank => (
        <div key={`pot-${rank.rank}`} className="rank">
          <h4>Rank {rank.rank}: [{rank.total}%]</h4>
          <ul>
            {rank.items.map(item => (
              <li key={item.name}>{`${item.name} (${item.percentage}%)`}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default PotRanks;