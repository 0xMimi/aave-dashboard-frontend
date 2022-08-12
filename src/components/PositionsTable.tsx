import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type Position = {
    name: string;
    symbol: string;
    amount: number;
    value: number;
    apy: number;
    is_collateral?: boolean;
    mode?: string;
};

type Positions = {
    apy: number;
    balance: number;
    positions: Position[];
};

interface Props {
    tableName: string;
    positions: Positions;
}

function PositionsTable({ tableName, positions }: Props) {
    return (
        <Box
            sx={{
                width: "40%",
                display: "inline-block",
                verticalAlign: "top",
                padding: "5px",
            }}
        >
            <Paper sx={{ width: "100%", mb: 2 }} elevation={5}>
                <Typography
                    sx={{ flex: "1 1 70%", padding: "10px" }}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                >
                    {tableName}
                </Typography>
                <Box sx={{ height: 40 }}>
                    <Paper
                        sx={{
                            height: "70%",
                            display: "inline-block",
                            padding: "5px",
                        }}
                        elevation={10}
                        variant="outlined"
                    >
                        <Typography>
                            Balance: $ {positions.balance.toFixed(2)}
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            height: "70%",
                            display: "inline-block",
                            padding: "5px",
                        }}
                        elevation={10}
                        variant="outlined"
                    >
                        <Typography>
                            APY: {positions.apy.toFixed(2)}%
                        </Typography>
                    </Paper>
                </Box>
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Asset</TableCell>
                                <TableCell align="center">Balance</TableCell>
                                <TableCell align="center">Value</TableCell>
                                <TableCell align="center">APY</TableCell>
                                <TableCell align="center">
                                    {tableName === "Borrows"
                                        ? "APY Type"
                                        : "Collateral"}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {positions.positions.map((item) => {
                            return (
                                <TableRow>
                                    <TableCell align="center">
                                        {item.symbol}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.amount.toFixed(4)}
                                    </TableCell>
                                    <TableCell align="center">
                                        ${item.value.toFixed(2)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.apy.toFixed(2)}%
                                    </TableCell>
                                    <TableCell align="center">
                                        {"mode" in item
                                            ? item.mode
                                            : item.is_collateral
                                            ? "True"
                                            : "False"}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default PositionsTable;
export type { Position, Positions };
