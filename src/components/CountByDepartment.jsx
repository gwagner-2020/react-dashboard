import React from 'react';
import {BarList} from "@tremor/react";

function CountByDepartment({artworks}) {

    const artworksArray = artworks;

    const updatedArtworks = artworksArray.map(artwork => {
      return { name: artwork.key.department_title, value: artwork.doc_count }; 
    });

    return (
        <>
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Department
          </h3>

          <BarList className="max-w-md mx-auto mt-6" color="purple"
            // data={filteredResult}
            data={updatedArtworks} 
            sortOrder="descending"
          />
        </>
      );
};

export default CountByDepartment;