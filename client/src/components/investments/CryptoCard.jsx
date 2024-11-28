import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileInvoiceDollar} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


function CryptoCard(props) {
    const crypto = props.data["1. From_Currency Code"];
    const cryptoName = props.data["2. From_Currency Name"];
    const currency = props.data["3. To_Currency Code"];
    const currencyName = props.data["4. To_Currency Name"];
    const price = props.data["5. Exchange Rate"];
    const bidPrice = props.data["8. Bid Price"];
    const askPrice = props.data["9. Ask Price"];


    return (

        <div className="stats stats-horizontal shadow-lg hover:shadow-2xl hover:bg-blue-950 cursor-pointer bg-base-200 bg-opacity-70">
            <div className="stat">
                <div className="stat-title">Symbol</div>
                <div className="stat-value">{crypto}-{currency}</div>
                <div className="stat-desc">{cryptoName}-{currencyName}</div>
                <div className="stat-figure text-secondary"><img src={props.img1} alt="currency_logo"
                                                                 className="w-12 h-12"/>
                </div>

            </div>

            <div className="stat">
                <div className="stat-title">Price</div>
                <div className="stat-value">{parseFloat(price).toFixed(2)}</div>
                <div className="stat-figure text-secondary"><img src={props.img2} alt="crypto_logo"
                                                                 className="w-12 h-12"/>
                </div>
            </div>

            <div className="stat">
                <div className="stat-title">Bid-Ask</div>
                <div className="stat-value">{Math.floor(bidPrice)}-{Math.floor(askPrice)}</div>
                <div
                    className="stat-desc">↘︎ {Math.floor(askPrice - bidPrice)} ({Math.floor(askPrice / bidPrice)}%)
                </div>
                <div className="stat-figure text-success"><FontAwesomeIcon icon={faFileInvoiceDollar} size="2x"/></div>
            </div>
        </div>
    );
}

export default CryptoCard;