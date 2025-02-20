import React, { useState } from 'react';

export function Dropdown({ options, title, func}) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        func(event.target.value)
    };

    return (
        <div>
            <label htmlFor="dropdown">{title}</label>
            <select id="dropdown" value={selectedValue} onChange={handleChange}>
                <option value="">-- Выберите --</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}