import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import { convertTempArray} from './utils.js';

function TemperatureGraph(props) {

    const data = convertTempArray(props.data, props.isCelcius)
    const maxTempInArray = Math.max(...data.map((num) => num.temp));
    const domainMax = maxTempInArray + 10
    const minTempInArray = Math.min(...data.map((num) => num.temp));
    const domainMin = minTempInArray - 10

    return (

        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                // width={500}
                // height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid horizontal={false} vertical={false} />
                <XAxis hide={true} tickLine={false} axisLine={false} dataKey="dt" />
                <YAxis hide={true} domain={[domainMin, domainMax]} />
                <Tooltip />
                <Area type="monotone" dataKey="temp" stroke="#fbbc04" fill="#fff3c9" isAnimationActive={false} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default TemperatureGraph;