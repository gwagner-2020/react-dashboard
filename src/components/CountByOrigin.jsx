import React from 'react';
import {BarList} from "@tremor/react";

function CountByOrigin({artworks}) {

  const artworksArray = artworks;

  const updatedArtworks = artworksArray.map(artwork => {
    return { name: artwork.key.place_of_origin, value: artwork.doc_count };
  }).sort((a, b) => b.value - a.value).slice(0, 20);

  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Count By Place of Origin (Top 20)
      </h3>
  
      <BarList className="max-w-md mx-auto mt-6" color="purple"
        data={updatedArtworks} 
        sortOrder="descending"
        showAnimation="true"
      />
    </>
  );
};

export default CountByOrigin;