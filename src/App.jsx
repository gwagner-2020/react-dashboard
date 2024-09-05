import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import { Card, Metric, Text } from "@tremor/react";
import AccessionDeaccession from './components/AccessionDeaccession';
import CountByObjectType from './components/CountByObjectType';
import CountByDepartment from './components/CountByDepartment.jsx';

function App() {
  const [artworks, setArtworks] = useState([]);

// const instance = axios.create({
//   baseURL: 'https://api.artic.edu/api',
// });

// getAllArtworks();

// async function getAllArtworks() {
//     try {
//         const response = await instance.get('/v1/artworks');
//         const totalArtworks = response.data.count;
//         const totalPages = Math.ceil(totalArtworks / response.data.max_per_page);
//         const promiseArray = [];
//         for (let i = 0; i < (totalPages + 1); i++) {
//             promiseArray.push(instance.get(`/artworks?page=${i}`));
//         };

//         // promise.all allows you to make multiple axios requests at the same time.
//         // It returns an array of the results of all your axios requests
//         let resolvedPromises = await Promise.all(promiseArray)
//         for (let i = 0; i < resolvedPromises.length; i++) {
//             // This will give you access to the output of each API call
//             console.log(resolvedPromises[i])
//         }
//         setArtworks(resolvedPromises);
//     } catch (err) {
//         console.log('Something went wrong.');
//     }
//   }
  
    useEffect(() => {
    // getAllArtworks();
    axios.get('https://api.artic.edu/api/v1/artworks?page=400&limit=100')
    .then(response => {      
      setArtworks(response.data);
      }
    )
      .catch(error => {
        console.error(error);
      });
  }, []);

  //console.log(artworks.pagination);
  //console.log(artworks.data);
  const artworksArray = artworks.data;
  console.log('artworksArray:', artworksArray);

  return (
    <>
      <div className="text-left">
        {/* <div className="grid grid-cols-2 gap-12"> */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Acquisitions</h2>
            {/* <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="indigo"> */}
              <AccessionDeaccession/>
            {/* </Card> */}
          </div>
        {/* </div> */}
      </div>

      <div className="text-left">
        {/* <div className="grid grid-cols-2 gap-12"> */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Count By Object Type</h2>
            {/* <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="indigo"> */}
              <CountByObjectType/>
            {/* </Card> */}
          </div>
        {/* </div> */}
      </div>

      <div className="text-left">
        {/* <div className="grid grid-cols-2 gap-12"> */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Count By Department</h2>
            {/* <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="indigo"> */}
              <CountByDepartment/>
            {/* </Card> */}
          </div>
        {/* </div> */}
      </div>

      <div>
        <ul>
          {artworksArray?.map(artwork=> (
            <><li>{artwork?.artist_display}, {artwork?.title}, {artwork?.main_reference_number}</li><li>
              <img src={'https://www.artic.edu/iiif/2/' + artwork?.image_id + '/full/200,/0/default.jpg'} alt="artwork" />
            </li></>
          ))}
        </ul>
        {/* {artworksArray?.map(artwork => (
        <img key={artwork?.id} src={'https://www.artic.edu/iiif/2/' + artwork?.image_id + '/full/843,/0/default.jpg'} alt="artwork"></img>
        ))} */}
      </div>
    </>
  )
}

export default App
