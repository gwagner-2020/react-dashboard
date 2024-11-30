import React, { useState, useEffect } from 'react';
import { Card} from "@tremor/react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../App.css'
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
                    }
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
      {/* Navigation Div */}
      <div>
        <NavLink to="/departmentdashboard">
                <button class="button">
                    <div>Department Dashboard</div>
                </button>
        </NavLink>
      </div>
      
      {/* Accession Tile Div */}
      <div className="text-left">
          <div>
            <Card className="mx-auto mt-6 mb-6" decoration="top" decorationColor="purple">
              <AccessionDeaccession artworks={artworksByYearAcquired}/>
            </Card>
          </div>
      </div>

      {/* Other Counts Tiles Div */}
      <div className="text-left">
        <div className="grid grid-cols-3 gap-12">
          <div>
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
              <CountByObjectType artworks={artworksByObjectType}/>
            </Card>
          </div>
          <div>
            <Card className="max-w-md mx-auto mb-6" decoration="top" decorationColor="purple">
            <CountByDepartment artworks={artworksByDepartment}/>
            </Card>
          </div>
          <div>
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
