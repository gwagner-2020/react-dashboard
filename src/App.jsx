import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import { Card, Metric, Text } from "@tremor/react";
import icon1 from "./assets/icon1.png";
import AccessionDeaccession from './components/AccessionDeaccession';
import CountByObjectType from './components/CountByObjectType';
import CountByDepartment from './components/CountByDepartment.jsx';
import CountByOrigin from './components/CountByOrigin.jsx';

function App() {
  const [artworks, setArtworks] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

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
  
   /*    Code for one api call */
  //   useEffect(() => {
  //   // getAllArtworks();
  //   axios.get('https://api.artic.edu/api/v1/artworks?page=250&limit=100')
  //   .then(response => {      
  //     setArtworks(response.data);
  //     }
  //   )
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);

  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=100`)
        console.log('response: ', response);
        setArtworks((prevArtworks) => [...prevArtworks, ...response.data.data]);      
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false); 
      }
    };
    fetchData();
  }, [page]);

  console.log('page: ', page);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  console.log("artworks: ", artworks)
  //Use this artworksArray for single api call
  //const artworksArray = artworks.data;
  const artworksArray = artworks;
  console.log('artworksArray:', artworksArray);

  return (
    <>
      {/* Header Div */}
      <div className="sticky top-0 z-50 h-30 w-full flex items-center text-center bg-gradient-to-r from-purple-500 to-indigo-500">
          <a href='/'>
            <img className="mt-2 mb-2 ml-10 w-24" src={icon1} alt="person looking at image"/>
          </a>
          <span className="text-3xl tracking-wider text-center text-white mx-auto">
            <span className="font-bold">Collection Statistics Dashboard</span>
          </span>
      </div>
      
      <div className="text-left">
        {/* <div className="grid grid-cols-1"> */}
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Acquisitions</h2> */}
            <Card className="mx-auto mt-6 mb-6" decoration="top" decorationColor="purple">
              <AccessionDeaccession artworks={artworks}/>
            </Card>
          </div>
        {/* </div> */}
      </div>

      <div className="text-left">
        <div className="grid grid-cols-3 gap-12">
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Count By Object Type</h2> */}
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
              <CountByObjectType artworks={artworks}/>
            </Card>
          </div>
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Count By Department</h2> */}
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
            <CountByDepartment artworks={artworks}/>
            </Card>
          </div>
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Count By Place Of Origin</h2> */}
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
              <CountByOrigin artworks={artworks}/>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <button onClick={handleLoadMore}>Load More</button>
      </div>

      <div>
        {/* <ul>
          {artworksArray?.map(artwork=> (
            <><li>{artwork?.artist_display}, {artwork?.title}, {artwork?.main_reference_number}</li><li>
              {artwork?.image_id !== null &&
              <img
                src={'https://www.artic.edu/iiif/2/' + artwork?.image_id + '/full/200,/0/default.jpg'} alt="artwork"
              />}
            </li></>
          ))}
        </ul> */}
        {/* {artworksArray?.map(artwork => (
        <img key={artwork?.id} src={'https://www.artic.edu/iiif/2/' + artwork?.image_id + '/full/843,/0/default.jpg'} alt="artwork"></img>
        ))} */}
      </div>
    </>
  )
}

export default App
