import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'testalpacadocs/2.0.0 (api/6.1.2)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * This endpoint provides data about the corporate actions for each given symbol over a
     * specified time period.
     *
     *
     * @summary Corporate actions
     */
    corporateActions(metadata) {
        return this.core.fetch('/v1beta1/corporate-actions', 'get', metadata);
    }
    /**
     * Get the latest forex rates for the given currency pairs.
     *
     *
     * @summary Latest rates for currency pairs
     */
    latestRates(metadata) {
        return this.core.fetch('/v1beta1/forex/latest/rates', 'get', metadata);
    }
    /**
     * Get historical forex rates for the given currency pairs in the given time interval, and
     * at the given timeframe (snapshot frequency).
     *
     *
     * @summary Historical rates for currency pairs
     */
    rates(metadata) {
        return this.core.fetch('/v1beta1/forex/rates', 'get', metadata);
    }
    /**
     * Get the image of the company logo for the given symbol
     *
     * @summary Logos
     */
    logos(metadata) {
        return this.core.fetch('/v1beta1/logos/{symbol}', 'get', metadata);
    }
    /**
     * Returns latest news articles across stocks and crypto. By default returns latest 10 news
     * articles.
     *
     * @summary News articles
     */
    news(metadata) {
        return this.core.fetch('/v1beta1/news', 'get', metadata);
    }
    /**
     * The historical option bars API provides aggregates for a list of option symbols between
     * the specified dates.
     *
     * The returned results are sorted by symbol first then by bar timestamp.
     * This means that you are likely to see only one symbol in your first response if there
     * are enough bars for that symbol to hit the limit you requested on that request.
     *
     * In these situations if you keep requesting again with the `next_page_token` you will
     * eventually reach the next symbols if any bars were found for them.
     *
     * @summary Historical bars
     */
    optionBars(metadata) {
        return this.core.fetch('/v1beta1/options/bars', 'get', metadata);
    }
    /**
     * Returns the mapping between the option exchange codes and the corresponding exchanges
     * names.
     *
     *
     * @summary Exchange codes
     */
    optionMetaExchanges() {
        return this.core.fetch('/v1beta1/options/meta/exchanges', 'get');
    }
    /**
     * Returns the mapping between the condition codes and names.
     *
     *
     * @summary Condition codes
     */
    optionMetaConditions(metadata) {
        return this.core.fetch('/v1beta1/options/meta/conditions/{ticktype}', 'get', metadata);
    }
    /**
     * The latest multi quotes endpoint provides the latest bid and ask prices for each given
     * contract symbol.
     *
     *
     * @summary Latest quotes
     */
    optionLatestQuotes(metadata) {
        return this.core.fetch('/v1beta1/options/quotes/latest', 'get', metadata);
    }
    /**
     * The latest multi trades endpoint provides the latest historical trade data for multiple
     * given contract symbols.
     *
     *
     * @summary Latest trades
     */
    optionLatestTrades(metadata) {
        return this.core.fetch('/v1beta1/options/trades/latest', 'get', metadata);
    }
    /**
     * The historical option trades API provides trade data for a list of contract symbols
     * between the specified dates up to 7 days ago.
     *
     * The returned results are sorted by symbol first then by trade timestamp.
     * This means that you are likely to see only one symbol in your first response if there
     * are enough trades for that symbol to hit the limit you requested on that request.
     *
     * In these situations if you keep requesting again with the `next_page_token` you will
     * eventually reach the next symbols if any trades were found for them.
     *
     * @summary Historical trades
     */
    optionTrades(metadata) {
        return this.core.fetch('/v1beta1/options/trades', 'get', metadata);
    }
    /**
     * The snapshots endpoint provides the latest trade, latest quote and greeks for each given
     * contract symbol.
     *
     *
     * @summary Snapshots
     */
    optionSnapshots(metadata) {
        return this.core.fetch('/v1beta1/options/snapshots', 'get', metadata);
    }
    /**
     * The option chain endpoint provides the latest trade, latest quote and greeks for each
     * contract symbol of the underlying symbol.
     *
     *
     * @summary Option chain
     */
    optionChain(metadata) {
        return this.core.fetch('/v1beta1/options/snapshots/{underlying_symbol}', 'get', metadata);
    }
    /**
     * Returns the most active stocks by volume or trade count. By default returns the top 10
     * symbols by volume.
     *
     *
     * @summary Most active stocks
     */
    mostActives(metadata) {
        return this.core.fetch('/v1beta1/screener/stocks/most-actives', 'get', metadata);
    }
    /**
     * Returns the top market movers (gainers and losers). The change for each symbol is
     * calculated
     * from the previous closing price and the latest closing price.
     *
     * For stocks the endpoint resets at market open, until then it shows the last market day's
     * movers.
     * The data is split adjusted. Only tradable symbols are included.
     *
     * For crypto the endpoint resets at midnight.
     *
     * @summary Top market movers
     */
    movers(metadata) {
        return this.core.fetch('/v1beta1/screener/{market_type}/movers', 'get', metadata);
    }
    /**
     * The crypto bars API provides historical aggregates for a list of crypto symbols between
     * the specified dates.
     *
     * @summary Historical bars
     */
    cryptoBars(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/bars', 'get', metadata);
    }
    /**
     * The latest multi bars endpoint returns the latest minute-aggregated historical bar data
     * for each of the crypto symbols provided.
     *
     *
     * @summary Latest bars
     */
    cryptoLatestBars(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/latest/bars', 'get', metadata);
    }
    /**
     * The latest orderbook endpoint returns the latest bid and ask orderbook for the crypto
     * symbols provided.
     *
     *
     * @summary Latest orderbook
     */
    cryptoLatestOrderbooks(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/latest/orderbooks', 'get', metadata);
    }
    /**
     * The latest quotes endpoint returns the latest bid and ask prices for the crypto symbols
     * provided.
     *
     *
     * @summary Latest quotes
     */
    cryptoLatestQuotes(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/latest/quotes', 'get', metadata);
    }
    /**
     * The latest trades endpoint returns the latest trade data for the crypto symbols
     * provided.
     *
     *
     * @summary Latest trades
     */
    cryptoLatestTrades(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/latest/trades', 'get', metadata);
    }
    /**
     * The crypto quotes API provides historical quote data for a list of crypto symbols
     * between the specified dates.
     *
     * @summary Historical quotes
     */
    cryptoQuotes(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/quotes', 'get', metadata);
    }
    /**
     * The latest orderbook endpoint returns the latest trade, latest quote, latest minute bar,
     * latest daily bar, and previous daily bar data for crypto symbols.
     *
     *
     * @summary Snapshots
     */
    cryptoSnapshots(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/snapshots', 'get', metadata);
    }
    /**
     * The crypto trades API provides historical trade data for a list of crypto symbols
     * between the specified dates.
     *
     * @summary Historical trades
     */
    cryptoTrades(metadata) {
        return this.core.fetch('/v1beta3/crypto/{loc}/trades', 'get', metadata);
    }
    /**
     * The historical auctions endpoint provides auction prices for the stock symbol between
     * the specified dates.
     *
     *
     * @summary Historical auctions
     */
    stockAuctions(metadata) {
        return this.core.fetch('/v2/stocks/auctions', 'get', metadata);
    }
    /**
     * The historical stock bars API provides aggregates for a list of stock symbols between
     * the specified dates.
     *
     * The returned results are sorted by symbol first then by bar timestamp.
     * This means that you are likely to see only one symbol in your first response if there
     * are enough bars for that symbol to hit the limit you requested on that request.
     *
     * In these situations if you keep requesting again with the `next_page_token` you will
     * eventually reach the next symbols if any bars were found for them.
     *
     * @summary Historical bars
     */
    stockBars(metadata) {
        return this.core.fetch('/v2/stocks/bars', 'get', metadata);
    }
    /**
     * The latest multi bars endpoint returns the latest minute-aggregated historical bar data
     * for the ticker symbols provided.
     *
     *
     * @summary Latest bars
     */
    stockLatestBars(metadata) {
        return this.core.fetch('/v2/stocks/bars/latest', 'get', metadata);
    }
    /**
     * Returns the mapping between the condition codes and names.
     *
     *
     * @summary Condition codes
     */
    stockMetaConditions(metadata) {
        return this.core.fetch('/v2/stocks/meta/conditions/{ticktype}', 'get', metadata);
    }
    /**
     * Returns the mapping between the stock exchange codes and the corresponding exchanges
     * names.
     *
     *
     * @summary Exchange codes
     */
    stockMetaExchanges() {
        return this.core.fetch('/v2/stocks/meta/exchanges', 'get');
    }
    /**
     * The historical stock quotes API provides quote data for a list of stock symbols between
     * the specified dates.
     *
     * The returned results are sorted by symbol first then by quote timestamp.
     * This means that you are likely to see only one symbol in your first response if there
     * are enough quotes for that symbol to hit the limit you requested on that request.
     *
     * In these situations if you keep requesting again with the `next_page_token` you will
     * eventually reach the next symbols if any quotes were found for them.
     *
     * @summary Historical quotes
     */
    stockQuotes(metadata) {
        return this.core.fetch('/v2/stocks/quotes', 'get', metadata);
    }
    /**
     * The latest multi quotes endpoint provides the latest bid and ask prices for each given
     * ticker symbols.
     *
     *
     * @summary Latest quotes
     */
    stockLatestQuotes(metadata) {
        return this.core.fetch('/v2/stocks/quotes/latest', 'get', metadata);
    }
    /**
     * The snapshot endpoint for multiple tickers provides the latest trade, latest quote,
     * minute bar daily bar, and previous daily bar data for each given ticker symbol.
     *
     *
     * @summary Snapshots
     */
    stockSnapshots(metadata) {
        return this.core.fetch('/v2/stocks/snapshots', 'get', metadata);
    }
    /**
     * The historical stock trades API provides trade data for a list of stock symbols between
     * the specified dates.
     *
     * The returned results are sorted by symbol first then by trade timestamp.
     * This means that you are likely to see only one symbol in your first response if there
     * are enough trades for that symbol to hit the limit you requested on that request.
     *
     * In these situations if you keep requesting again with the `next_page_token` you will
     * eventually reach the next symbols if any trades were found for them.
     *
     * @summary Historical trades
     */
    stockTrades(metadata) {
        return this.core.fetch('/v2/stocks/trades', 'get', metadata);
    }
    /**
     * The latest multi trades endpoint provides the latest historical trade data for multiple
     * given ticker symbols.
     *
     *
     * @summary Latest trades
     */
    stockLatestTrades(metadata) {
        return this.core.fetch('/v2/stocks/trades/latest', 'get', metadata);
    }
    /**
     * The historical auctions endpoint provides auction prices for a list of stock symbols
     * between the specified dates.
     *
     *
     * @summary Historical auctions (single)
     */
    stockAuctionSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/auctions', 'get', metadata);
    }
    /**
     * The historical stock bars API provides aggregates for the stock symbol between the
     * specified dates.
     *
     * @summary Historical bars (single symbol)
     */
    stockBarSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/bars', 'get', metadata);
    }
    /**
     * The latest stock bars endpoint returns the latest minute-aggregated historical bar for
     * the requested security.
     *
     *
     * @summary Latest bar (single symbol)
     */
    stockLatestBarSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/bars/latest', 'get', metadata);
    }
    /**
     * The historical stock quotes API provides quote data for a stock symbol between the
     * specified dates.
     *
     * @summary Historical quotes (single symbol)
     */
    stockQuoteSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/quotes', 'get', metadata);
    }
    /**
     * The latest quotes endpoint provides the latest bid and ask prices for a given ticker
     * symbol.
     *
     *
     * @summary Latest quote (single symbol)
     */
    stockLatestQuoteSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/quotes/latest', 'get', metadata);
    }
    /**
     * The snapshot endpoint provides the latest trade, latest quote, minute bar daily bar, and
     * previous daily bar data for a given ticker symbol.
     *
     *
     * @summary Snapshot (single symbol)
     */
    stockSnapshotSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/snapshot', 'get', metadata);
    }
    /**
     * The historical stock trades API provides trade data for a stock symbol between the
     * specified dates.
     *
     * @summary Historical trades (single symbol)
     */
    stockTradeSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/trades', 'get', metadata);
    }
    /**
     * The latest trades endpoint provides the latest trade data for a given ticker symbol.
     *
     *
     * @summary Latest trade (single symbol)
     */
    stockLatestTradeSingle(metadata) {
        return this.core.fetch('/v2/stocks/{symbol}/trades/latest', 'get', metadata);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
