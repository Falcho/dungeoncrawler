import React from 'react';

const OptionPrompts = ({ onOptionSelect }) => {
    const options = [
        { label: 'Fight', value: 'fight' },
        { label: 'Flee', value: 'flee' },
        { label: 'Kick in the door', value: 'kick' },
        { label: 'Look for trouble', value: 'look' },
        { label: 'Go some direction', value: 'go' },
    ];

    return (
        <div className="option-prompts">
            <h3>Choose an action:</h3>
            <ul>
                {options.map(option => (
                    <li key={option.value}>
                        <button onClick={() => onOptionSelect(option.value)}>
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OptionPrompts;