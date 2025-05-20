import React from 'react';

const DungeonMap = ({ currentLocation }) => {
    return (
        <div className="dungeon-map">
            <h2>Dungeon Map</h2>
            <p>Current Location: {currentLocation}</p>
            {/* Here you can add more details about the dungeon map, such as a visual representation */}
        </div>
    );
};

export default DungeonMap;