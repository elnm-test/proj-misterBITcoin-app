import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Chart(props) {

    var data = props.chartData.map((val) => {
        return { name: '', y: val }
    })
    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            var temp;
            switch (props.type) {
                case 'market':
                    temp = (
                        <div className="custom-tooltip">
                            <p className="label">{`BITcoin Currency Value: ${payload[0].value} $`}</p>
                            <p className="desc">Watch and Exporle currency Trends</p>
                            <p className="info">(Last 99 Days)</p>

                        </div>
                    );
                    break;
                case 'trans':
                    temp = (
                        <div className="custom-tooltip">
                            <p className="label">{`Number Of Transactions Per Day: ${payload[0].value} Confirmed`}</p>
                            <p>(Last 49 Days)</p>
                        </div>
                    )
                    break;
                default: temp = null;
            }
        };
        return temp;
    }


    return (
        <div className="charts-resp-container">
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart

                    data={data}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <Area type="monotone" dataKey="y" stroke="#f9a744" fill="rgb(47,37,25)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )

}