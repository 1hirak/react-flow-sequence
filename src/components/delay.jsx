import { useState } from 'react';
import { Clock } from 'lucide-react';

export default function Delay() {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [seconds, setSeconds] = useState('0');

  // Ensure values stay within appropriate ranges
  const handleHoursChange = (e) => {
    const value = Math.max(0, Math.min(23, parseInt(e.target.value) || 0));
    setHours(value.toString());
  };

  const handleMinutesChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setMinutes(value.toString());
  };

  const handleSecondsChange = (e) => {
    const value = Math.max(0, Math.min(59, parseInt(e.target.value) || 0));
    setSeconds(value.toString());
  };

  const handleSubmit = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    console.log('Delay set for:', { hours, minutes, seconds, totalSeconds });
    // Here you would typically use this delay value in your application
    alert(`Delay set for ${hours}h ${minutes}m ${seconds}s (${totalSeconds} seconds total)`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="flex items-center mb-4">
        <Clock className="mr-2 text-blue-600" size={24} />
        <h2 className="text-xl font-medium text-gray-800">Set Delay Time</h2>
      </div>
      
      <div className="flex flex-col gap-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
              Hours
            </label>
            <input
              type="number"
              id="hours"
              min="0"
              max="23"
              value={hours}
              onChange={handleHoursChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
              Minutes
            </label>
            <input
              type="number"
              id="minutes"
              min="0"
              max="59"
              value={minutes}
              onChange={handleMinutesChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-1">
              Seconds
            </label>
            <input
              type="number"
              id="seconds"
              min="0"
              max="59"
              value={seconds}
              onChange={handleSecondsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Total time: {hours}h {minutes}m {seconds}s
          </div>
          
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Set Delay
          </button>
        </div>
      </div>
    </div>
  );
}