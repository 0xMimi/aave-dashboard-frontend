import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface Props {
    text: string;
}
function Statistic({ text }: Props) {
    return (
        <Box sx={{ padding: "5px", display: "inline-block" }}>
            <Paper
                sx={{
                    height: "70%",
                    padding: "5px",
                }}
                elevation={10}
                variant="outlined"
            >
                <Typography variant="h6">{text}</Typography>
            </Paper>
        </Box>
    );
}

export default Statistic;
