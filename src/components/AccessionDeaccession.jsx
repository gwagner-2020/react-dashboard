import React from 'react';
import {BarChart} from "@tremor/react";

function AccessionDeaccession({artworks}) {

  const artworksArray = artworks;
  console.log('artworksArray years: ', artworksArray);

  const updatedArtworks = artworksArray.map(artwork => {
    return { Objects: artwork.doc_count , year: artwork.key.fiscal_year}; 
  });
  console.log("updatedArtworks: ", updatedArtworks);
    
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Objects Acquired Per Year (Museum-Wide)
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