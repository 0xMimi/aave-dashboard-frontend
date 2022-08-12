import "./App.css";

import { useEffect, useState } from "react";

import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Positions } from "./components/PositionsTable";

const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const getAccount = async (address: string, version: string, market: string) => {
    const response = await fetch(
        "https://aave-user-dashboard-api.herokuapp.com/account?" +
            new URLSearchParams({
                version: version,
                market: market,
                address: address,
            })
    );
    const data = await response.json();
    return data;
};

function App() {
    const [activity, setActivity] = useState([]);
    const [lendPositions, setLendPositions] = useState<Positions>({
        apy: 0,
        balance: 0,
        positions: [],
    });
    const [borrowPositions, setBorrowPositions] = useState<Positions>({
        apy: 0,
        balance: 0,
        positions: [],
    });
    const [address, setAddress] = useState(
        "0xdaef20ea4708fcff06204a4fe9ddf41db056ba18"
    );
    const [version, setVersion] = useState("v2");
    const [market, setMarket] = useState("ethereum");
    const [revenue, setRevenue] = useState(0);
    const [cost, setCost] = useState(0);
    const [nbTx, setNbTx] = useState(0);

    const [curPage, setCurPage] = useState("dash");

    const reset = (): void => {
        setActivity([]);
        setLendPositions({ apy: 0, balance: 0, positions: [] });
        setBorrowPositions({ apy: 0, balance: 0, positions: [] });
        setCost(0);
        setRevenue(0);
        setNbTx(0);
    };

    const getData = (
        address: string,
        version: string,
        market: string
    ): void => {
        getAccount(address, version, market).then((data) => {
            const accData = data.data;
            if (accData != null) {
                setActivity(accData.activity);
                setLendPositions(accData.lend_positions);
                setBorrowPositions(accData.borrow_positions);
                setRevenue(accData.lend_revenue);
                setCost(accData.borrow_cost);
                setNbTx(accData.activity.length);
            }
        });
    };

    useEffect(() => {
        getData(address, version, market);
    }, []);

    return (
        <div className="App">
            <Navbar
                setAddress={setAddress}
                reset={reset}
                setVersion={setVersion}
                setMarket={setMarket}
                search={getData}
                setCurPage={setCurPage}
                curPage={curPage}
            />
            {curPage === "dash" ? (
                <Dashboard
                    version={version}
                    market={capitalize(market)}
                    address={address}
                    lendPositions={lendPositions}
                    borrowPositions={borrowPositions}
                    activity={activity}
                    revenue={revenue}
                    cost={cost}
                    nbTx={nbTx}
                />
            ) : (
                <></>
            )}
            {curPage === "about" ? <About /> : <></>}
        </div>
    );
}

export default App;
