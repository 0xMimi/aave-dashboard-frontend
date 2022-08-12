import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

type Event = {
    action: string;
    amount: number;
    name: string;
    symbol: string;
    timestamp: string;
    txhash: string;
    value: number;
};

interface Props {
    activity: Event[];
    explorer: string;
}

const timestampToDatetime = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
};

const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const hashToReadable = (hash: string): string => {
    return hash.slice(0, 6) + "..." + hash.slice(-5, -1);
};

function Activity({ activity, explorer }: Props) {
    return (
        <Box sx={{ width: "80.5%", display: "inline-block" }}>
            <Paper sx={{ width: "100%", mb: 2 }} elevation={5}>
                <Typography
                    sx={{ flex: "1 1 70%", padding: "10px" }}
                    variant="h5"
                    id="tableTitle"
                    component="div"
                >
                    Activity
                </Typography>
                <TableContainer
                    sx={{
                        height: 390,
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        size={"medium"}
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Timestamp</TableCell>
                                <TableCell>TxHash</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Asset</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        {activity.map((item) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {timestampToDatetime(
                                            parseInt(item.timestamp)
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <a
                                            href={explorer + item.txhash}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {hashToReadable(item.txhash)}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        {capitalize(item.action)}
                                    </TableCell>
                                    <TableCell>{item.symbol}</TableCell>
                                    <TableCell>
                                        {item.amount.toFixed(4)}
                                    </TableCell>
                                    <TableCell>
                                        ${item.value.toFixed(2)}
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

export default Activity;
export type { Event };
