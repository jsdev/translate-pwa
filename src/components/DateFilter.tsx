import React from 'react';

interface DateFilterProps {
  filterDate: string;
  setFilterDate: (value: string) => void;
}

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'week', label: 'This Week' }
];

export const DateFilter: React.FC<DateFilterProps> = ({ filterDate, setFilterDate }) => (
  <div className="flex gap-1 overflow-x-auto pb-2 prevent-bounce">
    {FILTERS.map(filter => (
      <button
        key={filter.value}
        onClick={() => setFilterDate(filter.value)}
        className={`px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
          filterDate === filter.value
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        {filter.label}
      </button>
    ))}
  </div>
);
