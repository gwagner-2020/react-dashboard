import React, {useState} from 'react';
import { Select, SelectItem } from "@tremor/react";
import DepartmentDashboard from './DepartmentDashboard';

function SelectList({artworks, stats}) {

    const artworksArray = artworks;
    const departments = artworksArray.map(artwork => {
        return { value: artwork.key.department_title, label: artwork.key.department_title };
    }).sort((a, b) => a.value - b.value);
    //console.log("departments: ", departments);
    //console.log("stats: ", stats);
    
    const [selectedDepartment, setSelectedDepartment] = useState("");

    const handleSelectChange = (value) => {
        setSelectedDepartment(value);
      };
    
    return (
        <div>
            <div>
                <Select
                    value={selectedDepartment}
                    onValueChange={handleSelectChange}
                    placeholder={"Select a department"}
                >
                    {departments.map((department) => (
                        <SelectItem key={department.value} value={department.value}>
                        {department.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div>
                <DepartmentDashboard stats={stats} department={selectedDepartment}/>
            </div>
        </div>
    );
};

export default SelectList;