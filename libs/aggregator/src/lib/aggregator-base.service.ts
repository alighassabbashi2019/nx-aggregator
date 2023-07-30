export abstract class AggregatorBaseService {
  getAuthAggregatedData?(filters: any): Promise<string[]>;
  getApiAggregatedData?(filters: any): Promise<string[]>;
}
