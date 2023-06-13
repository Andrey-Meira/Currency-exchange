import { ExchangeRateListItem } from './ExchangeRateListItem.interface';

export interface ExchangeRateList {
  data: ExchangeRateListItem[];
  from: string;
  lastUpdatedAt: string;
  rateLimitExceeded: boolean;
  success: boolean;
  to: string;
}
