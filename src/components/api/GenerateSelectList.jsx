import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GenerateSelectList() {
    const [deptSelectList, setDeptSelectList] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async() => {
          setLoading(true);
          try {
            const queryDeptSelectList = {
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

            const [responseDeptSelectList] = await Promise.all([
                axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryDeptSelectList)
            ]);
            setDeptSelectList(responseDeptSelectList.data.aggregations.my_buckets.buckets);
        } catch (error) {  
            console.error("Error fetching data: ", error);
          } finally {
            setLoading(false); 
          }
        };
        fetchData();
      }, [page]);

    const departments = deptSelectList.map(artwork => {
        return { value: artwork.key.department_title, label: artwork.key.department_title };
    }).sort((a, b) => a.value - b.value);

    return departments;
};

export default GenerateSelectList;