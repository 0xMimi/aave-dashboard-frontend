function About() {
    return (
        <div>
            <h1>About</h1>
            <p>
                Code can be found{" "}
                <a
                    href="https://github.com/0xMimi/aave-dashboard-server"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>
            </p>
            <p>and</p>
            <p>
                <a
                    href="https://github.com/0xMimi/aave-dashboard-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>
            </p>
            <p>Most Aave data is from the Messari subgraphs</p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v2-avalanche"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Avalanche V2
                </a>
            </p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v2-ethereum"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ethereum V2
                </a>
            </p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v3-arbitrum"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Arbitrum V3
                </a>
            </p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v3-avalanche"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Avalanche V3
                </a>
            </p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v3-fantom"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Fantom V3
                </a>
            </p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v3-harmony"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Harmony V3
                </a>
            </p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v3-optimism"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Optimism V3
                </a>
            </p>
            <p>
                <a
                    href="https://api.thegraph.com/subgraphs/name/messari/aave-v3-polygon"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Polygon V3
                </a>
            </p>
            <p>Polygon V2 is omitted because the subgraph is not synced</p>
            <p>
                Additional data like latest price, and sometimes balance, are
                retrieved on-chain from Aave contracts and Chainlink oracles.
            </p>
            <p>
                Used contract addresses can be found{" "}
                <a
                    href="https://github.com/0xMimi/aave-dashboard-server/blob/master/modules/providers.py"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>
            </p>
            <p>
                GraphQL queries for the subgraphs can be found{" "}
                <a
                    href="https://github.com/0xMimi/aave-dashboard-server/blob/master/modules/query.py"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>
            </p>
            <p>
                query_v2 and query_v3 are used to get the bulk of the data
                displayed on the dashboard
            </p>
            <p>
                query_lend_revenue and query_borrow_cost are used to calculate
                loan revenue and borrow costs
            </p>
            <p>
                The way loan revenue and borrow cost are calculated is very
                experimental. It only considers deposits-withdraws and
                borrows-repays, so it is not always accurate. Every time there
                is a withdraw or repay event, we subtract the previous balance
                from the new balance pre-withdraw/repay. The difference, in
                theory, should be the accrued interest/fee. We then multiply it
                by the price at the time of withdrawal/repayment to get the
                dollar value. If the balance is non-zero at the end, we do a
                similar process, but with the current price and current balance.
                This is the interest/fee that hasn't been "claimed" yet. Taxes
                are usually calculated based on the value at the time the assets
                are received, which is why I chose to do it this way.{" "}
                <p>
                    <a
                        href="https://github.com/0xMimi/aave-dashboard-server/blob/master/modules/fetcher.py#L191"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Lend Revenue
                    </a>
                </p>
                <p>
                    <a
                        href="https://github.com/0xMimi/aave-dashboard-server/blob/master/modules/fetcher.py#L235"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Borrow Cost
                    </a>
                </p>
            </p>
            <h4>Known issues</h4>
            <p>Polygon v2 subgraph not synced</p>
            <p>
                Users can interact with Aave without producing any events caught
                by the subgraphs. It is possible to transfer/buy/sell aTokens
                directly, which changes a wallet's Aave positions. For example,
                if I deposit 1 ETH on Aave, then sell 1 aEth on a DEX, I
                essentially withdrew my deposit, but this isn't caught by the
                subgraph. All metrics displayed by the dashboard will thus be
                wrong.
            </p>
            <p>
                Some tokens' price cannot be retrieved from the Aave oracle
                (haven't looked into why yet), so we cannot find the value when
                calculating revenue or cost. Value defaults to 0 when real value
                cannot be retrieved.
            </p>
        </div>
    );
}

export default About;
