import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BarChart, Card, DonutChart, Legend} from "@tremor/react";

function DepartmentMetrics({department}) {
    const [objectsAcquiredByYearByDept, setObjectsAcquiredByYearByDept] = useState([]);
    const [objectTypeByDept, setObjectTypeByDept] = useState([]);
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
        
        const queryGetObjectTypeByDept = {
            params: {
                'size': 0,
                'aggs': {
                'my_buckets': {
                    'composite': {
                    'size': 5000,
                    'sources': [
                        {
                        'artwork_type_title': {
                            'terms': {
                            'field': 'artwork_type_title.keyword'
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

        const [responseGetObjectsAcquiredByYearByDept, responseGetObjectTypeByDept] = await Promise.all([
            axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetObjectsAcquiredByYearByDept),
            axios.get(`https://api.artic.edu/api/v1/artworks/search`, queryGetObjectTypeByDept)
        ]);
        
        setObjectsAcquiredByYearByDept(responseGetObjectsAcquiredByYearByDept.data.aggregations.my_buckets.buckets);
        setObjectTypeByDept(responseGetObjectTypeByDept.data.aggregations.my_buckets.buckets);
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
    
    const filteredObjectTypeByDept = objectTypeByDept.filter(object => object.key.department_title == department);
    const updatedObjectTypeByDept = filteredObjectTypeByDept.map(object => {
        return { typename: object.key.artwork_type_title, objectcount: object.doc_count }; 
    });

    const legendLabels = updatedObjectTypeByDept.map(item => item.typename);

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

            {/* Deaccession By Dept Tile Div */}
            <div className="text-left">
                <div>
                     <Card className="mx-auto mt-6 mb-6" decoration="top" decorationColor="purple">
                        <>
                            <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Objects By Type In {department}
                                </h3>
                            <DonutChart
                                className="mx-auto h-80"
                                data={updatedObjectTypeByDept}
                                category="objectcount"
                                index="typename"
                                valueFormatter={(number) =>
                                    `${Intl.NumberFormat('us').format(number).toString()}`
                                }
                            />
                            <Legend
                                categories={legendLabels}
                                className="max-w-lg"
                            />
                        </>
                    </Card>
                </div>
            </div>   
        </div>
       );
};

export default DepartmentMetrics;