import React from 'react';
import {BarChart, BarList} from "@tremor/react";

function CountByOrigin({artworks}) {

    // Use this one for a single api call
    //const artworksArray = artworks.data;
    const artworksArray = artworks;
    //console.log('artworksArray years: ', artworksArray);  
    
    // function countByPlaceOfOrigin(arr) {
    //     const placesOfOrigin = arr?.map(artwork => artwork?.place_of_origin); // Extract places of origin
    //     //console.log("placesOfOrigin: ", placesOfOrigin);
    //     //console.log("placesOfOrigin type: ", typeof placesOfOrigin);
    //     const uniquePlacesOfOrigin = [...new Set(placesOfOrigin)]; // Get unique places of origin
    //     //console.log("uniquePlacesOfOrigin: ", uniquePlacesOfOrigin);
    //     const counts = new Array(uniquePlacesOfOrigin.length).fill(0); // Initialize counts array
    //     //console.log("counts: ", counts);
      
    //     for (let i = 0; i < placesOfOrigin?.length; i++) {
    //       const index = uniquePlacesOfOrigin.indexOf(placesOfOrigin[i]);
    //       counts[index]++;
    //     }
        
    //     //return for BarChart
    //     //return uniqueObjectTypes.map((objectType, i) => ({ objectType, count: counts[i] }));
    //     //return for BarList
    //     return uniquePlacesOfOrigin.map((name, i) => ({ name, value: counts[i] }));
    // }
      
    // const result = countByPlaceOfOrigin(artworksArray);
    // //console.log("Result:", result);
    // const filteredResult = result.filter(function (obj) {
    //     return obj.name;
    // });
    // //console.log("Filtered result: ", filteredResult);

    const updatedArtworks = artworksArray.map(artwork => {
      return { name: artwork.key.place_of_origin, value: artwork.doc_count}; 
    });

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Places Of Origin (object count)
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
            //data={filteredResult} 
            data={updatedArtworks} 
            sortOrder="descending"
            showAnimation="true"
          />
        </>
      );
};

export default CountByOrigin;