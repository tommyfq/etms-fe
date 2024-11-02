import React, { useState } from 'react';


interface SearchableDropdownProps {
    options: any[];
    label: string;
    onChange: (selectedOptions: any[]) => void;
    dataAttributes?: { [key: string]: string }; // Optional attributes
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, label, onChange, dataAttributes }) => {
    const [query, setQuery] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleSelectOption = (option: any) => {
        setSelectedOptions(prev => {
            const newSelectedOptions = prev.includes(option)
                ? prev.filter(item => item !== option)
                : [...prev, option];

            onChange(newSelectedOptions);
            return newSelectedOptions;
        });
    };

    const filteredOptions = options.filter(option => 
        option.label.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>{label}</label>
            <div className='relative'>
                <div
                    className='form-select form-select-solid fw-bolder'
                    onClick={toggleDropdown}
                    {...dataAttributes} // Spread the data attributes here
                >
                    <div>
                        {selectedOptions.length > 0
                            ? selectedOptions.map(option => (
                                <span key={option.value} className='badge bg-primary me-1'>
                                    {option.label}
                                    <button 
                                        type='button' 
                                        className='btn-close btn-close-white btn-close-sm ms-1' 
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent dropdown from closing
                                            handleSelectOption(option);
                                        }}
                                    />
                                </span>
                            ))
                            : 'Select option'}
                    </div>
                </div>
                {isOpen && (
                    <div className='options'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Search...'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <ul className='menu'>
                            {filteredOptions.map(option => (
                                <li
                                    key={option.value}
                                    className={`menu-item ${selectedOptions.includes(option) ? 'selected' : ''}`}
                                    onClick={() => handleSelectOption(option)}
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchableDropdown;