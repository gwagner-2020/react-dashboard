import React from 'react';
import {BarChart} from "@tremor/react";

function DepartmentDashboard({stats, department}) {

    //make an api call here?

    const artworksArray = stats;
    //console.log('artworksArray DeptByYear: ', artworksArray);
    //console.log('department: ', department);

    const updatedArtworks = artworksArray.map(artwork => {
      return { Objects: artwork.doc_count, year: artwork.key.fiscal_year, dept: artwork.key.department_title}; 
    }).filter(artwork => artwork.dept == department);
    //console.log("updatedArtworksDebtByYear: ", updatedArtworks);

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Objects Acquired By Department (per year)
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

export default DepartmentDashboard;