import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define types for country and reseller data
interface Country {
  name: string;
  code: string;
}

interface Reseller {
  id: number;
  name: string;
}

const CountryResellerSelector: React.FC = () => {
  const [countries] = useState<Country[]>([
    { name: 'Bangladesh', code: 'BD' },
    { name: 'India', code: 'IN' },
    { name: 'Pakistan', code: 'PK' },
  ]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [resellers, setResellers] = useState<Reseller[]>([]);
  const [selectedReseller, setSelectedReseller] = useState<Reseller | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch resellers based on the selected country
  useEffect(() => {
    if (selectedCountry) {
      const fetchResellers = async () => {
        setLoading(true);
        setError('');
        try {
          const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
          const token = userDetails?.token;

          const response = await axios.get(
            `https://api.bazigaar.com/wallet_app/api/v1/user/country-wise-reseller/?country=${selectedCountry.name}`,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          setResellers(response.data || []);
        } catch (err) {
          console.error('Error fetching resellers:', err);
          setError('Failed to fetch resellers.');
        } finally {
          setLoading(false);
        }
      };

      fetchResellers();
    }
  }, [selectedCountry]);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg w-72 space-y-4">
      {/* Country Selector */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Select Country</h2>
        <div className="space-y-2">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => setSelectedCountry(country)}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                selectedCountry?.name === country.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-400'
              } hover:bg-gray-700`}
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>

      {/* Reseller Selector */}
      {selectedCountry && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Select Reseller</h2>
          {loading ? (
            <p className="text-sm text-gray-400">Loading resellers...</p>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : resellers.length > 0 ? (
            <div className="space-y-2">
              {resellers.map((reseller) => (
                <button
                  key={reseller.id}
                  onClick={() => setSelectedReseller(reseller)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedReseller?.id === reseller.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-400'
                  } hover:bg-gray-700`}
                >
                  {reseller.name}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No resellers available.</p>
          )}
        </div>
      )}

      {/* Selected Reseller Display */}
      {selectedReseller && (
        <div className="mt-4 p-2 bg-gray-800 rounded-lg text-center text-sm">
          Selected Reseller: <span className="text-blue-400 font-medium">{selectedReseller.name}</span>
        </div>
      )}
    </div>
  );
};

export default CountryResellerSelector;
