import { BaseStoreItem } from '@shared/service/indexeddb.service';

export interface ApiCallLog extends BaseStoreItem {
  id: string;
  url: string;
  method: string;
  headers: { [key: string]: string };
  requestBody: any;
  params: { [key: string]: string | string[] };
  status: number;
  success: boolean;
  responseBody: any;
  errorMessage: string | null;
  duration: number; // in milliseconds
  timestamp: number;
  createdOn: string;
  userAgent: string;
  branchKey?: string;
}

export interface ApiCallStats {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  averageDuration: number;
  callsByMethod: Record<string, number>;
  callsByStatus: Record<number, number>;
  last24Hours: number;
  lastHour: number;
}

export interface ApiCallFilter {
  startDate?: number;
  endDate?: number;
  method?: string;
  url?: string;
  status?: number;
  success?: boolean;
  minDuration?: number;
  maxDuration?: number;
}
