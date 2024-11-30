import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { Select, SelectItem, Card } from "@tremor/react";
import GenerateSelectList from './api/GenerateSelectList';
import DepartmentMetrics from './api/DepartmentMetrics';

function SelectList() {

    const departments = GenerateSelectList();

    const [selectedDepartment, setSelectedDepartment] = useState("");
    
    const handleSelectChange = (value) => {
        setSelectedDepartment(value);
      };
    
    return (
        <div>
            {/* Navigation Div */}
            <div>
                <NavLink to="/">
                    <div>Home</div>
                </NavLink>
            </div>
            
            {/* Department Select Div */}
            <div className="text-left">
                <div>
                    <Card className="mx-auto mt-6 mb-6" decoration="top" decorationColor="purple">
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
                    </Card>
                </div>
            </div>

            <div>
                <DepartmentMetrics department={selectedDepartment}/>
            </div>
        </div>
    );
};

export default SelectList;