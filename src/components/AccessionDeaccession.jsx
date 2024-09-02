import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BarChart} from "@tremor/react";

function AccessionDeaccession() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        axios
            .get(
                'https://api.artic.edu/api/v1/artworks?page=3&limit=100&fields=id,fiscal_year,fiscal_year_deaccession,department_title'
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

    function countAcquisitionsPerYear(arr) {
        const years = arr?.map(artwork => artwork?.fiscal_year); // Extract years
        console.log("years: ", years);
        console.log("years data type: ", typeof years);
        const uniqueYears = [...new Set(years)]; // Get unique years
        console.log("uniqueYears: ", uniqueYears);
        const counts = new Array(uniqueYears.length).fill(0); // Initialize counts array
        console.log("counts: ", counts);
      
        for (let i = 0; i < years?.length; i++) {
          const index = uniqueYears.indexOf(years[i]);
          counts[index]++;
        }
      
        return uniqueYears.map((year, i) => ({ year, count: counts[i] }));
    }
      
    const result = countAcquisitionsPerYear(artworksArray);
    console.log("Result:", result);
    const sortedResult = result.sort((a, b) => a.year - b.year);
    console.log("Sorted result: ", sortedResult);
    const filteredSortedResult = sortedResult.filter(function (obj) {
        return obj.year !== null;
    });
    console.log("Filtered result: ", filteredSortedResult);

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Number of artworks acquired per year
          </h3>
          <BarChart
            className="mt-6"
            data={filteredSortedResult}
            index="year"
            categories={['count']}
            colors={['blue']}
            valueFormatter={(number) =>
              `${Intl.NumberFormat("us").format(number).toString()}`
            }
            xAxis={{title: "year"}}
            yAxis={{title: "count"}}
            yAxisWidth={48}
          />
        </>
      );
    
};

export default AccessionDeaccession;