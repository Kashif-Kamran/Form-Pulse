import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

// VaccinationBar component
const VaccinationBar = () => {
  const [selectedVaccine, setSelectedVaccine] = useState("Select vaccine");

  const vaccineOptions = [
    "Anti-MERS",
    "Anti-COVID",
    "Anti-Flu",
    "Anti-Rabies",
  ];

  return (
    <div className="w-full mx-auto p-2" style={{ backgroundColor: '#116C2B', borderRadius: '10px' }}>
      <div className="flex justify-center">
        <div className="w-52 border border-white" style={{ backgroundColor: '#116C2B'}}>
          <Select
            value={selectedVaccine}
            onValueChange={(value) => setSelectedVaccine(value)}
          >
            <SelectTrigger style={{ color: 'white', borderRadius: '0' }}>
              <SelectValue>
                {selectedVaccine}
              </SelectValue>
            </SelectTrigger>
            <SelectContent style={{ borderColor: 'white', borderRadius: '0' }}>
              {/* Add the default option */}
              <SelectItem value="Select vaccine" style={{ color: 'black' }}>
                Select vaccine
              </SelectItem>
              {vaccineOptions.map((vaccine, index) => (
                <SelectItem
                  key={index}
                  value={vaccine}
                  style={{ color: 'black' }}
                >
                  {vaccine}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default VaccinationBar;