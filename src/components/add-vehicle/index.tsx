import React, { useState, useEffect } from 'react';
import { fetchYears, fetchMakes, fetchModels, fetchOptions, fetchVehicleData } from '@/api/vehicleApi';
import { VehicleMenuItem } from '@/api/schema';
import { Combobox } from '@/components/ui/combobox';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import ky from '@/api/utils/ky';

const AddVehicle: React.FC = () => {
  const [years, setYears] = useState<VehicleMenuItem[]>([]);
  const [makes, setMakes] = useState<VehicleMenuItem[]>([]);
  const [models, setModels] = useState<VehicleMenuItem[]>([]);
  const [options, setOptions] = useState<VehicleMenuItem[]>([]);
  const [fuelTypes] = useState([
    { label: '95', value: '95' },
    { label: '98', value: '98' },
    { label: 'Diesel', value: 'diesel' },
  ]);

  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedVersion, setSelectedVersion] = useState<string>('');
  const [selectedFuelType, setSelectedFuelType] = useState<string>('');

  const [showInput, setShowInput] = useState<boolean>(false);
  const [efficiency, setEfficiency] = useState<number | null>(null);

  useEffect(() => {
    const loadYears = async () => {
      try {
        const years = await fetchYears();
        setYears(years);
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };
    loadYears();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      const loadMakes = async () => {
        try {
          const makes = await fetchMakes(selectedYear);
          setMakes(makes);
        } catch (error) {
          console.error('Error fetching makes:', error);
        }
      };
      loadMakes();
    } else {
      setMakes([]);
      setSelectedMake('');
      setModels([]);
      setSelectedModel('');
      setOptions([]);
      setSelectedVersion('');
      setSelectedFuelType('');
      setEfficiency(null);
      setShowInput(false);
    }
  }, [selectedYear]);

  useEffect(() => {
    if (selectedYear && selectedMake) {
      const loadModels = async () => {
        try {
          const models = await fetchModels(selectedYear, selectedMake);
          setModels(models);
        } catch (error) {
          console.error('Error fetching models:', error);
        }
      };
      loadModels();
    } else {
      setModels([]);
      setSelectedModel('');
      setOptions([]);
      setSelectedVersion('');
      setSelectedFuelType('');
      setEfficiency(null);
      setShowInput(false);
    }
  }, [selectedYear, selectedMake]);

  useEffect(() => {
    if (selectedYear && selectedMake && selectedModel) {
      const loadOptions = async () => {
        try {
          const options = await fetchOptions(selectedYear, selectedMake, selectedModel);
          setOptions(options);
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      };
      loadOptions();
    } else {
      setOptions([]);
      setSelectedVersion('');
      setSelectedFuelType('');
      setEfficiency(null);
      setShowInput(false);
    }
  }, [selectedYear, selectedMake, selectedModel]);

  useEffect(() => {
    const fetchVehicleDataFromApi = async () => {
      const vehicleId = selectedVersion;
      const data = await fetchVehicleData(vehicleId);

      const mpgToLPer100km = 235.215; // Conversion factor from MPG to L/100km
      const efficiency = mpgToLPer100km / parseFloat(data.avgMpg);
      if (efficiency) {
        setEfficiency(efficiency);
        setShowInput(false);
      } else {
        setShowInput(true);
      }
    };

    if (selectedVersion) fetchVehicleDataFromApi();
  }, [selectedVersion]);

  const handleAddVehicle = async () => {
    try {
      const response = await ky.post('vehicles', {
        json: {
          year: selectedYear,
          manufacturer: selectedMake,
          model: selectedModel,
          version: options.find(version => version.value === selectedVersion)?.text,
          fuel_type: selectedFuelType,
          fuel_efficiency: efficiency?.toFixed(2),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }

      clearFields();

      toast.success('Vehicle added successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error adding vehicle');
    }
  };

  const clearFields = () => {
    setSelectedYear('');
    setSelectedMake('');
    setSelectedModel('');
    setSelectedVersion('');
    setSelectedFuelType('');
    setEfficiency(null);
  };

  const handleEfficiencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^(100(\.0{0,2})?|[1-9]?[0-9](\.[0-9]{0,2})?)$/;

    if (regex.test(value) || value === '') {
      setEfficiency(value === '' ? null : parseFloat(value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
    }
  };

  return (
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>Add New Vehicle</CardTitle>
      </CardHeader>

      <CardContent className="flex w-full flex-col items-center gap-4">
        <div className="flex w-full items-center gap-4">
          <Label>Year:</Label>
          <Combobox
            value={selectedYear}
            onChange={value => {
              setSelectedYear(value);
              setSelectedMake('');
              setSelectedModel('');
              setSelectedVersion('');
              setSelectedFuelType('');
              setEfficiency(null);
              setShowInput(false);
            }}
            options={years.map(year => ({ label: year.text, value: year.value }))}
            placeholder="Select Year"
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <Label>Make:</Label>
          <Combobox
            value={selectedMake}
            onChange={value => {
              setSelectedMake(value);
              setSelectedModel('');
              setSelectedVersion('');
              setSelectedFuelType('');
              setEfficiency(null);
              setShowInput(false);
            }}
            options={makes.map(make => ({ label: make.text, value: make.value }))}
            placeholder="Select Make"
            disabled={!selectedYear}
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <Label>Model:</Label>
          <Combobox
            value={selectedModel}
            onChange={value => {
              setSelectedModel(value);
              setSelectedVersion('');
              setSelectedFuelType('');
              setEfficiency(null);
              setShowInput(false);
            }}
            options={models.map(model => ({ label: model.text, value: model.value }))}
            placeholder="Select Model"
            disabled={!selectedMake}
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <Label>Options:</Label>
          <Combobox
            value={selectedVersion}
            onChange={value => {
              setSelectedVersion(value);
              setSelectedFuelType('');
              setEfficiency(null);
              setShowInput(false);
            }}
            options={options.map(option => ({ label: option.text, value: option.value }))}
            placeholder="Select Option"
            disabled={!selectedModel}
          />
        </div>
        <div className="flex w-full items-center gap-4">
          <Label>Fuel Type:</Label>
          <Combobox
            value={selectedFuelType}
            onChange={setSelectedFuelType}
            options={fuelTypes}
            placeholder="Select Fuel Type"
            disabled={!selectedVersion}
          />
        </div>

        {showInput && (
          <div className="flex w-full items-center gap-4">
            <Input
              value={efficiency || ''}
              onChange={handleEfficiencyChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter l/100km"
              type="number"
            />
          </div>
        )}

        <Button className="bg-teal-500" onClick={handleAddVehicle} disabled={!selectedVersion}>
          Add Vehicle
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddVehicle;
