import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import { Card, Metric, Text} from "@tremor/react";
import icon1 from "./assets/icon1.png";
import AccessionDeaccession from './components/AccessionDeaccession';
import CountByObjectType from './components/CountByObjectType';
import CountByDepartment from './components/CountByDepartment.jsx';
import CountByOrigin from './components/CountByOrigin.jsx';
import SelectList from './components/SelectList.jsx';

function App() {
  const [artworksByYearAcquired, setArtworksByYearAcquired] = useState([]);
  const [artworksByObjectType, setArtworksByObjectType] = useState([]);
  const [artworksByDepartment, setArtworksByDepartment] = useState([]);
  const [artworksByOrigin, setArtworksByOrigin] = useState([]);
  const [artworksByDeptByYear, setArtworksByDeptByYear] = useState([]);
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

  /* Code for the multiple load button api calls */
  // useEffect(() => {
  //   const fetchData = async() => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=100`)
  //       console.log('response: ', response);
  //       setArtworks((prevArtworks) => [...prevArtworks, ...response.data.data]);      
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     } finally {
  //       setLoading(false); 
  //     }
  //   };
  //   fetchData();
  // }, [page]);

  // console.log('page: ', page);

  // const handleLoadMore = () => {
  //   setPage((prevPage) => prevPage + 1);
  // };

  // console.log("artworks: ", artworks)
  // //Use this artworksArray for single api call
  // //const artworksArray = artworks.data;
  // const artworksArray = artworks;
  // console.log('artworksArray:', artworksArray);

  //https://api.artic.edu/api/v1/artworks/search?size=0&aggs[my-agg-name][terms][field]=place_of_origin.keyword
  //https://api.artic.edu/api/v1/artworks/search?size=0&aggs[fiscal-year][terms][field]=fiscal_year
  useEffect(() => {
    const fetchData = async() => {
      setLoading(true);
      try {
        const queryGetByYearAcquired = {
          params: {
            'size': 0,
            'aggs': {
              'my_buckets': {
                'composite': {
                  'size': 500,
                  'sources': [
                    {
                      'fiscal_year': {
                        'terms': {
                          'field': 'fiscal_year'
                        }
                      }
                    }//,
                    // {
                    //   'artwork_type_id': {
                    //     'terms': {
                    //       'field': 'artwork_type_id'
                    //     }
                    //   }
                    // }
                  ]
                }
              }
            }
          }
        };

        const query2 = 
        {
          params: {
            'size': 0,
            'aggs': {
              'my_buckets': {
                'composite': {
                  'sources': [
                    {
                      'fiscal_year': {
                        'terms': {
                          'field': 'fiscal_year'
                        }
                      }
                    }
                  ],
                  'after': { 'fiscal_year': 1922 } 
                }
              }
            }
          }
        };

        const queryGetByObjectType = {
          params: {
            'size': 0,
            'aggs': {
              'my_buckets': {
                'composite': {
                  'size': 500,
                  'sources': [
                    {
                      'artwork_type_title': {
                        'terms': {
                          'field': 'artwork_type_title.keyword'
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        };

        const queryGetByDept = {
          params: {
            'size': 0,
            'aggs': {
              'my_buckets': {
                'composite': {
                  'size': 500,
                  'sources': [
                    {
                      'department_title': {
                        'terms': {
                          'field': 'department_title.keyword'
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        };

        const queryGetByPlaceOrigin = {
          params: {
            'size': 0,
            'aggs': {
              'my_buckets': {
                'composite': {
                  'size': 2000,
                  'sources': [
                    {
                      'place_of_origin': {
                        'terms': {
                          'field': 'place_of_origin.keyword'
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        };

        const queryGetDeptByYearAcquired = {
          params: {
            'size': 0,
            'aggs': {
              'my_buckets': {
                'composite': {
                  'size': 5000,
                  'sources': [
                    {
                      'fiscal_year': {
                        'terms': {
                          'field': 'fiscal_year'
                        }
                      }
                    },
                    {
                      'department_title': {
                        'terms': {
                          'field': 'department_title.keyword'
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        };
        //const response = await axios.get(`https://api.artic.edu/api/v1/artworks/search?size=0&aggs[bucket][composite][sources][fiscal_year][terms][field]=fiscal_year`)
        const [responseByYearAcquired, responseByObjectType, responseByDept, responseByPlaceOrigin, responseDeptByYearAcquired] = await Promise.all([
        //const response = await axios.get(`https://api.artic.edu/api/v1/artworks/search`, query1);
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByYearAcquired),
        //console.log('response: ', response);
        //const afterKey = response.data.aggregations.my_buckets.after_key.fiscal_year;
        //console.log('afterKey: ', afterKey);
        //const response2 = await axios.get(`https://api.artic.edu/api/v1/artworks/search?size=0&aggs[bucket][composite][sources][fiscal_year][terms][field]=fiscal_year[after][fiscal_year]=1922`)
        //const response2 = await axios.get(`https://api.artic.edu/api/v1/artworks/search`, query2);
        //console.log('response2: ', response2);
        //setArtworks((prevArtworks) => [...prevArtworks, ...response.data.data]);
        //setArtworks(response.data.aggregations.my_buckets.buckets);
        
        //const response3 = await axios.get(`https://api.artic.edu/api/v1/artworks/search`, query3);
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByObjectType),
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByDept),
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByPlaceOrigin),
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetDeptByYearAcquired)
      ]);
        console.log('responseByYearAcquired: ', responseByYearAcquired);
        console.log('responseByObjectType: ', responseByObjectType);
        console.log('responseByDept: ', responseByDept);
        console.log('responseByPlaceOrigin: ', responseByPlaceOrigin);
        console.log('responseByPlaceOrigin: ', responseDeptByYearAcquired);
        setArtworksByYearAcquired(responseByYearAcquired.data.aggregations.my_buckets.buckets);
        setArtworksByObjectType(responseByObjectType.data.aggregations.my_buckets.buckets);
        setArtworksByDepartment(responseByDept.data.aggregations.my_buckets.buckets);
        setArtworksByOrigin(responseByPlaceOrigin.data.aggregations.my_buckets.buckets);
        setArtworksByDeptByYear(responseDeptByYearAcquired.data.aggregations.my_buckets.buckets);
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

  console.log("artworksByYearAcquired: ", artworksByYearAcquired)
  //Use this artworksArray for single api call
  //const artworksArray = artworks.data;
  const artworksArrayByYearAcquired = artworksByYearAcquired;
  console.log('artworksArrayByYearAcquired:', artworksArrayByYearAcquired);
  console.log('artworksByObjectType: ', artworksByObjectType);
  console.log('artworksByDepartment: ', artworksByDepartment);
  console.log('artworksByOrigin: ', artworksByOrigin);
  console.log('artworksByDeptByYear: ', artworksByDeptByYear);

  return (
    <>
      {/* Header Div */}
      <div className="sticky top-0 z-50 h-30 w-full flex items-center text-center bg-gradient-to-r from-purple-500 to-indigo-500">
          <a href='/'>
            <img className="mt-2 mb-2 ml-10 w-24" src={icon1} alt="person looking at image"/>
          </a>
          <span className="text-3xl tracking-wider text-center text-white mx-auto">
            <span className="font-bold">Collection Insights Dashboard</span>
          </span>
      </div>
      
      <div className="text-left">
        {/* <div className="grid grid-cols-1"> */}
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Acquisitions</h2> */}
            <Card className="mx-auto mt-6 mb-6" decoration="top" decorationColor="purple">
              <AccessionDeaccession artworks={artworksByYearAcquired}/>
            </Card>
          </div>
        {/* </div> */}
      </div>

      <div className="text-left">
        {/* <div className="grid grid-cols-1"> */}
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Acquisitions</h2> */}
            <Card className="mx-auto mt-6 mb-6" decoration="top" decorationColor="purple">
              <SelectList artworks={artworksByDepartment} stats={artworksByDeptByYear}/>
            </Card>
          </div>
        {/* </div> */}
      </div>

      <div className="text-left">
        <div className="grid grid-cols-3 gap-12">
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Count By Object Type</h2> */}
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
              <CountByObjectType artworks={artworksByObjectType}/>
            </Card>
          </div>
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Count By Department</h2> */}
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
            <CountByDepartment artworks={artworksByDepartment}/>
            </Card>
          </div>
          <div>
            {/* <h2 className="text-2xl font-bold mb-6">Count By Place Of Origin</h2> */}
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
              <CountByOrigin artworks={artworksByOrigin}/>
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
