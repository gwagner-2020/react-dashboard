import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BarChart, BarList} from "@tremor/react";

function CountByDepartment() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        axios
            .get(
                'https://api.artic.edu/api/v1/artworks?page=400&limit=100&fields=id,main_reference_number,department_title'
            )
            .then(response => {      
                setArtworks(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const artworksArray = artworks.data;
    console.log('artworksArray years: ', artworksArray);  
    
    function countByObjectType(arr) {
        const departments = arr?.map(artwork => artwork?.department_title); // Extract departments
        console.log("departments: ", departments);
        console.log("departments type: ", typeof departments);
        const uniqueDepartments = [...new Set(departments)]; // Get unique departments
        console.log("uniqueObjectTypes: ", uniqueDepartments);
        const counts = new Array(uniqueDepartments.length).fill(0); // Initialize counts array
        console.log("counts: ", counts);
      
        for (let i = 0; i < departments?.length; i++) {
          const index = uniqueDepartments.indexOf(departments[i]);
          counts[index]++;
        }
        
        //return for BarChart
        //return uniqueObjectTypes.map((objectType, i) => ({ objectType, count: counts[i] }));
        //return for BarList
        return uniqueDepartments.map((name, i) => ({ name, value: counts[i] }));
    }
      
    const result = countByObjectType(artworksArray);
    console.log("Result:", result);
    const filteredResult = result.filter(function (obj) {
        return obj.department !== null;
    });
    console.log("Filtered result: ", filteredResult);

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Number of Artworks By Department
          </h3>
          {/* <BarChart
            className="mt-6"
            data={filteredResult}
            index="objectType"
            categories={['count']}
            colors={['blue']}
            valueFormatter={(number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
            }
            xAxis={{title: "objectType"}}
            yAxis={{title: "count"}}
            yAxisWidth={48}
          /> */}
          <BarList 
            data={filteredResult} 
            sortOrder="ascending"
          />
        </>
      );
};

export default CountByDepartment;