import React from 'react';
import {BarChart} from "@tremor/react";

function AccessionDeaccession({artworks}) {

  // Use this one for a single api call
  //const artworksArray = artworks.data;
    const artworksArray = artworks;
    console.log('artworksArray years: ', artworksArray);

    // function getYearFromReferenceNumber(arr) {
    //     const refNumbers = artworksArray?.map(artwork => artwork?.main_reference_number);
    //     //console.log('refNumbers: ', refNumbers);
    //     const years = refNumbers?.map(refNumber => refNumber.substring(0, refNumber.indexOf(".")));
    //     //console.log('Years from Reference Numbers: ', years)
    //     return years;
    // }    
    
    // function countAcquisitionsPerYear(arr) {
    //     //const years = arr?.map(artwork => artwork?.fiscal_year); // Extract years
    //     const years = getYearFromReferenceNumber(arr); // Extract years
    //     //console.log("years: ", years);
    //     //console.log("years data type: ", typeof years);
    //     const uniqueYears = [...new Set(years)]; // Get unique years
    //     //console.log("uniqueYears: ", uniqueYears);
    //     const counts = new Array(uniqueYears.length).fill(0); // Initialize counts array
    //     //console.log("counts: ", counts);
      
    //     for (let i = 0; i < years?.length; i++) {
    //       const index = uniqueYears.indexOf(years[i]);
    //       counts[index]++;
    //     }
      
    //     return uniqueYears.map((year, i) => ({ year, count: counts[i] }));
    // }
      
    // const result = countAcquisitionsPerYear(artworksArray);
    // //console.log("Result:", result);
    // const sortedResult = result.sort((a, b) => a.year - b.year);
    // //console.log("Sorted result: ", sortedResult);
    // const filteredSortedResult = sortedResult.filter(function (obj) {
    //     return obj.year;
    // });
    //console.log("Filtered result: ", filteredSortedResult);

    const updatedArtworks = artworksArray.map(artwork => {
      return { Objects: artwork.doc_count , year: artwork.key.fiscal_year}; 
    });
    console.log("updatedArtworks: ", updatedArtworks);
    
    const years2 = artworksArray?.map(artwork => artwork?.key.fiscal_year);
    console.log("years2: ", years2);
    const doc_counts = artworksArray?.map(artwork => artwork?.doc_count);
    console.log("doc_counts: ", doc_counts);
    const combinedArray = years2.map((element, index) => [element, doc_counts[index]]);
    console.log("combinedArray: ", combinedArray);

    console.log(combinedArray);

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Objects Acquired (per year)
          </h3>
          <BarChart
            className="mt-6"
            data={updatedArtworks}
            index="year"
            categories={['Objects']}
            colors={['purple']}
            valueFormatter={(number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
            }
            yAxisWidth={48}
          />
        </>
      );
};

export default AccessionDeaccession;