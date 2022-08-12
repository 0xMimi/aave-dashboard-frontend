import { useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";

const ethers = require("ethers");
const utils = ethers.utils;

interface Props {
    setAddress: Function;
    reset: Function;
    setVersion: Function;
    setMarket: Function;
    search: any;
    setCurPage: Function;
    curPage: string;
}

function Navbar({
    setVersion,
    setMarket,
    setAddress,
    reset,
    search,
    setCurPage,
    curPage,
}: Props) {
    const [tempAddress, setTempAddress] = useState<string>();
    const [tempVersion, setTempVersion] = useState<string>("v2");
    const [tempMarket, setTempMarket] = useState<string>("ethereum");

    const handleAddressChange = (e: any) => {
        setTempAddress(e.target.value);
    };

    const handleVersionChange = (e: any) => {
        setTempVersion(e.target.value);
        if (e.target.value === "v2") setTempMarket("avalanche");
        else if (e.target.value === "v3") setTempMarket("arbitrum");
    };

    const handleMarketChange = (e: any) => {
        setTempMarket(e.target.value);
    };

    const submit = () => {
        if (utils.isAddress(tempAddress)) {
            reset();
            setAddress(tempAddress);
            setVersion(tempVersion);
            setMarket(tempMarket);
            search(tempAddress, tempVersion, tempMarket);
        }
    };

    const markets: any = {
        v2: [
            "avalanche",
            "ethereum",
            // "polygon",
        ],
        v3: [
            "arbitrum",
            "avalanche",
            "fantom",
            "harmony",
            "optimism",
            "polygon",
        ],
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{ justifyContent: "space-between" }}
                >
                    <Button
                        variant="text"
                        sx={{ color: "white" }}
                        onClick={() => setCurPage("dash")}
                    >
                        Dashboard
                    </Button>
                    <Button
                        variant="text"
                        sx={{ color: "white" }}
                        onClick={() => setCurPage("about")}
                    >
                        About
                    </Button>
                    <Box sx={{ display: "inline-block" }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="version-label">Version</InputLabel>
                            <Select
                                labelId="version-label"
                                label="Version"
                                value={tempVersion}
                                onChange={handleVersionChange}
                            >
                                <MenuItem value="v2">v2</MenuItem>
                                <MenuItem value="v3">v3</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="market-label">Market</InputLabel>
                            <Select
                                labelId="version-label"
                                label="Version"
                                value={tempMarket}
                                onChange={handleMarketChange}
                            >
                                {markets[tempVersion].map((item: any) => {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        label="Search address"
                        variant="outlined"
                        sx={{ width: "50%" }}
                        onChange={handleAddressChange}
                    ></TextField>
                    <Button
                        sx={{ color: "white" }}
                        onClick={submit}
                        disabled={curPage !== "dash"}
                    >
                        Search
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
