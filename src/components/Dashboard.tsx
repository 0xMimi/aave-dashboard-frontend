import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Activity, { Event } from "./Activity";
import PositionsTable, { Positions } from "./PositionsTable";
import Statistic from "./Statistic";
import LoanChart from "./LoanChart";
import BorrowChart from "./BorrowChart";

interface Props {
    version: string;
    market: string;
    address: string;
    lendPositions: Positions;
    borrowPositions: Positions;
    activity: Event[];
    revenue: number;
    cost: number;
    nbTx: number;
}

const explorers: any = {
    Arbitrum: "https://arbiscan.io/tx/",
    Avalanche: "https://snowtrace.io/tx/",
    Ethereum: "https://etherscan.io/tx/",
    Fantom: "https://ftmscan.com/tx/",
    Harmony: "https://explorer.harmony.one/tx/",
    Optimism: "https://optimistic.etherscan.io/tx/",
    Polygon: "https://polygonscan.com/tx/",
};

const getNetApy = (
    lendBalance: number,
    lendApy: number,
    borrowBalance: number,
    borrowApy: number
): number => {
    if (lendBalance - borrowBalance === 0) return 0;
    return (
        (lendBalance * lendApy + borrowBalance * -borrowApy) /
        (lendBalance - borrowBalance)
    );
};

function Dashboard({
    version,
    market,
    address,
    lendPositions,
    borrowPositions,
    activity,
    revenue,
    cost,
    nbTx,
}: Props) {
    const netWorth = lendPositions.balance - borrowPositions.balance;
    const netApy = getNetApy(
        lendPositions.balance,
        lendPositions.apy,
        borrowPositions.balance,
        borrowPositions.apy
    );
    return (
        <Box>
            <Box
                sx={{
                    width: "80.5%",
                    display: "inline-block",
                    padding: "10px",
                }}
            >
                <Paper sx={{ width: "100%", mb: 2 }} elevation={5}>
                    <Typography variant="h4" sx={{ padding: "5px" }}>
                        {market} {version}
                    </Typography>
                    <Typography variant="h6">{address}</Typography>
                    <Statistic text={`Net Worth: $${netWorth.toFixed(2)}`} />
                    <Statistic text={`Net APY: ${netApy.toFixed(2)}%`} />
                    <Typography variant="subtitle1">
                        *Net APY applies to net worth
                    </Typography>
                </Paper>
            </Box>
            <Box sx={{ width: "80.5%", display: "inline-block" }}>
                <Paper sx={{ width: "100%", mb: 2 }} elevation={5}>
                    <Typography variant="h4" sx={{ padding: "5px" }}>
                        Statistics
                    </Typography>
                    <Typography variant="subtitle1" sx={{ padding: "5px" }}>
                        Experimental, likely inaccurate
                    </Typography>
                    <Statistic text={`Loan Revenue: $ ${revenue.toFixed(2)}`} />
                    <Statistic text={`Borrow Cost: $ ${cost.toFixed(2)}`} />
                    <Statistic text={`# of Transactions: ${nbTx}`} />
                </Paper>
            </Box>
            <Box>
                <PositionsTable
                    positions={lendPositions}
                    tableName="Supplies"
                />
                <PositionsTable
                    positions={borrowPositions}
                    tableName="Borrows"
                />
            </Box>
            <Box sx={{ width: "80.5%", display: "inline-block" }}>
                <Typography variant="subtitle1">
                    *Only considers events caught by subgraph. Value is
                    determined according to prices at time of event.
                </Typography>
                <Box sx={{ display: "inline-block", width: "50%" }}>
                    <LoanChart activity={activity} />
                </Box>
                <Box sx={{ display: "inline-block", width: "50%" }}>
                    <BorrowChart activity={activity} />
                </Box>
            </Box>
            <Activity
                activity={activity}
                explorer={explorers[market]}
            ></Activity>
        </Box>
    );
}

export default Dashboard;
