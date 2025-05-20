import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RadialBarChart, RadialBar, Legend, Tooltip } from 'recharts';
import { BASE_URL } from '../context/ShopContext';

const AvgProductsStat = () => {
    const [avg, setAvg] = useState(0);

    useEffect(() => {
        const fetchAvg = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/stats/avg-products-per-user`);
                setAvg(Number(res.data.avg_products_per_user));
            } catch (err) {
                console.error('Failed to fetch stat', err);
            }
        };
        fetchAvg();
    }, []);

    const data = [
        {
            name: 'Avg Products/User',
            uv: avg,
            fill: '#8884d8'
        }
    ];

    return (
        <div className='p-4 border rounded max-w-md mx-auto'>
            <h2 className='text-xl font-bold mb-4 text-center'>Avg Products per User</h2>
            <RadialBarChart
                width={300}
                height={300}
                innerRadius="80%"
                outerRadius="100%"
                data={data}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar minAngle={15} background clockWise={true} dataKey="uv" />
                <Tooltip />
                <Legend />
            </RadialBarChart>
            <p className='text-center mt-2 text-lg'>{avg} products per user</p>
        </div>
    );
};

export default AvgProductsStat;
