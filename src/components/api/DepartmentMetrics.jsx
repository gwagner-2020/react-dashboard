import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BarChart, Card} from "@tremor/react";

function DepartmentMetrics({department}) {
    const [objectsAcquiredByYearByDept, setObjectsAcquiredByYearByDept] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
            const queryGetObjectsAcquiredByYearByDept = {
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

            const [responseGetObjectsAcquiredByYearByDept] = await Promise.all([
                axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetObjectsAcquiredByYearByDept)
            ]);
            
            setObjectsAcquiredByYearByDept(responseGetObjectsAcquiredByYearByDept.data.aggregations.my_buckets.buckets);
            } catch (error) {  
            console.error("Error fetching data: ", error);
            } finally {
            setLoading(false); 
            }
        };
        fetchData();
    }, [page]);

    const filteredObjectsAcquiredByYearByDept = objectsAcquiredByYearByDept.filter(object => object.key.department_title == department);
    
    const updatedObjectsAcquiredByYearByDept = filteredObjectsAcquiredByYearByDept.map(object => {
        return { Objects: object.doc_count , year: object.key.fiscal_year}; 
    });

    return (
        <div>
            {/* Accession By Dept Tile Div */}
            <div className="text-left">
                <div>
                     <Card className="mx-auto mt-6 mb-6" decoration="top" decorationColor="purple">
                        <>
                            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Objects Acquired By {department} (per year)
                            </h3>
                            <BarChart
                                className="mt-6"
                                data={updatedObjectsAcquiredByYearByDept}
                                index="year"
                                categories={['Objects']}
                                colors={['purple']}
                                valueFormatter={(number) =>
                                `${Intl.NumberFormat("us").format(number).toString()}`
                                }
                                yAxisWidth={48}
                            />
                        </>
                    </Card>
                </div>
            </div>   
        </div>
       );
};

export default DepartmentMetrics;