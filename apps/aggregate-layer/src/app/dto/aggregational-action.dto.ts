export enum AggregationActions {
  FILTER,
  SORT,
  COMBINE,
}

export interface BaseEntityFilters {
  name: string;
}

export interface FinalEntityFilters {
  title: string;
}

export interface AggregationFilters {
  baseEntityFilters: BaseEntityFilters;
  finalEntityFilters: FinalEntityFilters;
}

export class AggregationalActionDto {
  scenarioToken: string;
  filters: AggregationFilters;
  action: AggregationActions;
}
