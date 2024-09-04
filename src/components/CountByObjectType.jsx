import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BarChart, BarList} from "@tremor/react";

function CountByObjectType() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        axios
            .get(
                'https://api.artic.edu/api/v1/artworks?page=400&limit=100&fields=id,main_reference_number,artwork_type_title'
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

    // function getYearFromReferenceNumber(arr) {
    //     const refNumbers = artworksArray?.map(artwork => artwork?.main_reference_number);
    //     console.log('refNumbers: ', refNumbers);
    //     const years = refNumbers?.map(refNumber => refNumber.substring(0, refNumber.indexOf(".")));
    //     console.log('Years from Reference Numbers: ', years)
    //     return years;
    // }    
    
    function countByObjectType(arr) {
        const objectTypes = arr?.map(artwork => artwork?.artwork_type_title); // Extract years
        console.log("objectTypes: ", objectTypes);
        console.log("objectTypes type: ", typeof objectTypes);
        const uniqueObjectTypes = [...new Set(objectTypes)]; // Get unique years
        console.log("uniqueObjectTypes: ", uniqueObjectTypes);
        const counts = new Array(uniqueObjectTypes.length).fill(0); // Initialize counts array
        console.log("counts: ", counts);
      
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
    console.log("Result:", result);
    const filteredResult = result.filter(function (obj) {
        return obj.objectType !== null;
    });
    console.log("Filtered result: ", filteredResult);

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Number of Artworks By Object Type
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

export default CountByObjectType;