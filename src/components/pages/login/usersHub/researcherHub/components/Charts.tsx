import React from "react";
import {Bar, Line, Pie} from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import {registerables} from "chart.js";

ChartJS.register(...registerables);

export function BarChart(props:any) {
    const { chartData } = props;
    console.log(chartData)

    return <Bar data={chartData}/>;
}

export function LineChart(props:any) {
    const { chartData } = props;
    console.log(chartData)

    return <Line data={chartData}  />;
}

export function PieChart(props:any) {
    const { chartData } = props;
    console.log(chartData)

    return <Pie data={chartData}/>;
}