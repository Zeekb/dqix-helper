import React, { useState } from 'react';
import './App.css';
import ChestContents from './components/ChestContents';
import PotRanks from './components/PotRanks';
import ChestLocations from './components/ChestLocations';
import MapDisplay from './components/MapDisplay';
import ItemMapDisplay from './components/ItemMapDisplay'; // Import the new component

function App() {
  const [activeTab, setActiveTab] = useState('chests');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dragon Quest IX Grotto Helper</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for items or locations..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <nav className="tab-nav">
          <button onClick={() => setActiveTab('chests')}>Chests</button>
          <button onClick={() => setActiveTab('pots')}>Pots</button>
          <button onClick={() => setActiveTab('locations')}>Locations</button>
          <button onClick={() => setActiveTab('maps')}>Grotto Maps</button>
          <button onClick={() => setActiveTab('itemmap')}>Item Map</button>
        </nav>
      </header>
      <main>
        {activeTab === 'chests' && <ChestContents searchTerm={searchTerm} />}
        {activeTab === 'pots' && <PotRanks searchTerm={searchTerm} />}
        {activeTab === 'locations' && <ChestLocations searchTerm={searchTerm} />}
        {activeTab === 'maps' && <MapDisplay />}
        {activeTab === 'itemmap' && <ItemMapDisplay />}
      </main>
    </div>
  );
}

export default App;