import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Event } from "./Activity";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const timestampToDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString();
};

interface Props {
    activity: Event[];
}

function BorrowChart({ activity }: Props) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Borrows and Repays (Debt Value)",
            },
        },
    };
    console.log(activity);
    const depositsAndWithdraws = activity.filter(
        (item) => item.action === "repay" || item.action === "borrow"
    );
    const labels = depositsAndWithdraws
        .map((item) => timestampToDate(parseInt(item.timestamp)))
        .reverse();
    const tempDataPoints = depositsAndWithdraws.map((item) => [
        item.timestamp,
        item.action,
        item.value,
    ]);

    const sorted = tempDataPoints.sort(function (a: any, b: any) {
        return parseInt(a[0]) - parseInt(b[0]);
    });
    let balance = 0;
    const dataPoints: number[] = [];
    for (let i = 0; i < sorted.length; i++) {
        const action: any = sorted[i];
        if (action[1] === "borrow") {
            balance += parseFloat(action[2]);
        } else if (action[1] === "repay") {
            balance -= parseFloat(action[2]);
        }
        dataPoints.push(balance);
    }
    const data = {
        labels,
        datasets: [
            {
                label: "Debt Value",
                data: dataPoints,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };
    return <Line options={options} data={data} />;
}

export default BorrowChart;
