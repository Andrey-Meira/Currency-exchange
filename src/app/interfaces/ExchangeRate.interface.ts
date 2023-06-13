export interface ExchangeRate {
    exchangeRate: number,
    fromSymbol: string,
    lastUpdatedAt: string,
    rateLimitExceeded: boolean,
    success: boolean,
    toSymbol: string,
}