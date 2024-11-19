import React from 'react';
import {BarChart, BarList} from "@tremor/react";

function CountByObjectType({artworks}) {

    // Use this one for a single api call
    //const artworksArray = artworks.data;
    const artworksArray = artworks;
    //console.log('artworksArray years: ', artworksArray);  
    
    function countByObjectType(arr) {
        const objectTypes = arr?.map(artwork => artwork?.artwork_type_title); // Extract object types
        //console.log("objectTypes: ", objectTypes);
        //console.log("objectTypes type: ", typeof objectTypes);
        const uniqueObjectTypes = [...new Set(objectTypes)]; // Get unique object types
        //console.log("uniqueObjectTypes: ", uniqueObjectTypes);
        const counts = new Array(uniqueObjectTypes.length).fill(0); // Initialize counts array
        //console.log("counts: ", counts);
      
        for (let i = 0; i < objectTypes?.length; i++) {
          const index = uniqueObjectTypes.indexOf(objectTypes[i]);
          counts[index]++;
        }
        
        //return for BarChart
        //return uniqueObjectTypes.map((objectType, i) => ({ objectType, count: counts[i] }));
        //return for BarList
        return uniqueObjectTypes.map((name, i) => ({ name, value: counts[i] }));
    }
      
    const result = countByObjectType(artworksArray);
    //console.log("Result:", result);
    const filteredResult = result.filter(function (obj) {
        return obj.name;
    });
    //console.log("Filtered result: ", filteredResult);

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Types of Obects (object count)
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
          <BarList className="max-w-md mx-auto mt-6" color="purple"
            data={filteredResult} 
            sortOrder="descending"
          />
        </>
      );
};

export default CountByObjectType;