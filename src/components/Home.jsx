import React, { useState, useEffect } from 'react';
import { Card} from "@tremor/react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../App.css'
import icon1 from "../assets/icon1.png";
import AccessionDeaccession from './AccessionDeaccession';
import CountByObjectType from './CountByObjectType';
import CountByDepartment from './CountByDepartment.jsx';
import CountByOrigin from './CountByOrigin.jsx';


function Home() {
  const [artworksByYearAcquired, setArtworksByYearAcquired] = useState([]);
  const [artworksByObjectType, setArtworksByObjectType] = useState([]);
  const [artworksByDepartment, setArtworksByDepartment] = useState([]);
  const [artworksByOrigin, setArtworksByOrigin] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

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

        const queryTest = 
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

        const [responseByYearAcquired, responseByObjectType, responseByDept, responseByPlaceOrigin] = await Promise.all([
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByYearAcquired),
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByObjectType),
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByDept),
        axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetByPlaceOrigin)
        ]);

        setArtworksByYearAcquired(responseByYearAcquired.data.aggregations.my_buckets.buckets);
        setArtworksByObjectType(responseByObjectType.data.aggregations.my_buckets.buckets);
        setArtworksByDepartment(responseByDept.data.aggregations.my_buckets.buckets);
        setArtworksByOrigin(responseByPlaceOrigin.data.aggregations.my_buckets.buckets);

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
      
      {/* Navigation Div */}
      <div>
        <NavLink to="/departments">
            <div>Departments</div>
        </NavLink>
      </div>
      
      {/* Accession Tile Div */}
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

      {/* Other Counts Tiles Div */}
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
    </>
  )
}

export default Home
