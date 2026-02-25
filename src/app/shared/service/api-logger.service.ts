import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { IndexedDbService, DatabaseConfig } from '@shared/service/indexeddb.service';
import { ApiCallLog } from '@shared/model/api-call-log.model';

@Injectable({
  providedIn: 'root'
})
export class ApiLoggerService {
  private readonly DB_CONFIG: DatabaseConfig = {
    name: 'ApiCallsDB',
    version: 1,
    stores: [
      {
        storeName: 'apiCalls',
        keyPath: 'id',
        indexes: [
          {
            name: 'timestamp',
            keyPath: 'timestamp',
            unique: false
          },
          {
            name: 'url',
            keyPath: 'url',
            unique: false
          },
          {
            name: 'method',
            keyPath: 'method',
            unique: false
          },
          {
            name: 'status',
            keyPath: 'status',
            unique: false
          },
          {
            name: 'success',
            keyPath: 'success',
            unique: false
          }
        ]
      }
    ]
  };

  private readonly STORE_NAME = 'apiCalls';
  private readonly MAX_BODY_SIZE = 10000; // Limit body size to prevent storage issues

  constructor(private indexedDbService: IndexedDbService) { }

  async logApiCall(
    request: HttpRequest<any>,
    response?: HttpResponse<any> | HttpErrorResponse,
    duration?: number,
    error?: any
  ): Promise<void> {
    try {
      const status = response?.status || 0;
      const isSuccess = this.isApiCallSuccessful(response);

      const apiLog: ApiCallLog = {
        id: this.generateLogId(),
        url: request.url,
        method: request.method,
        headers: this.extractHeaders(request),
        requestBody: this.sanitizeBody(request.body),
        params: this.extractParams(request),
        status: status,
        success: isSuccess,
        responseBody: response ? this.sanitizeBody((response as any).body) : null,
        errorMessage: error ? (error.message || error.toString()) : null,
        duration: duration || 0,
        timestamp: Date.now(),
        createdOn: new Date().toLocaleString(),
        userAgent: navigator.userAgent,
        branchKey: this.getBranchKey()
      };

      await this.indexedDbService.saveItem(
        this.DB_CONFIG,
        this.STORE_NAME,
        apiLog
      );

      // console.log('API call logged:', apiLog.id);
    } catch (err) {
      console.error('Error logging API call:', err);
    }
  }

  private isApiCallSuccessful(response?: HttpResponse<any> | HttpErrorResponse): boolean {
    // Check if it's an HTTP-level success
    if (!(response instanceof HttpResponse)) {
      return false;
    }

    // Check business-level success based on response body structure
    try {
      const body = (response as any).body;

      if (!body) {
        return false;
      }

      // Check: responseCode is 200, data exists, and status is not 'FAILURE'
      const hasValidResponseCode = body.responseCode === 200;
      const hasData = body.data !== null && body.data !== undefined;
      const statusNotFailure = body.status !== 'FAILURE';

      return hasValidResponseCode && hasData && statusNotFailure;
    } catch (err) {
      // If we can't parse the body, fall back to HTTP-level success
      return true;
    }
  }

  async getAllApiCalls(): Promise<ApiCallLog[]> {
    try {
      return await this.indexedDbService.getAllItems<ApiCallLog>(
        this.DB_CONFIG,
        this.STORE_NAME
      );
    } catch (err) {
      console.error('Error retrieving API calls:', err);
      return [];
    }
  }

  async getApiCallsByUrl(url: string): Promise<ApiCallLog[]> {
    try {
      return await this.indexedDbService.getItemsByIndex<ApiCallLog>(
        this.DB_CONFIG,
        this.STORE_NAME,
        'url',
        url
      );
    } catch (err) {
      console.error('Error retrieving API calls by URL:', err);
      return [];
    }
  }

  async getApiCallsByMethod(method: string): Promise<ApiCallLog[]> {
    try {
      return await this.indexedDbService.getItemsByIndex<ApiCallLog>(
        this.DB_CONFIG,
        this.STORE_NAME,
        'method',
        method
      );
    } catch (err) {
      console.error('Error retrieving API calls by method:', err);
      return [];
    }
  }

  async getApiCallsByStatus(status: number): Promise<ApiCallLog[]> {
    try {
      return await this.indexedDbService.getItemsByIndex<ApiCallLog>(
        this.DB_CONFIG,
        this.STORE_NAME,
        'status',
        status
      );
    } catch (err) {
      console.error('Error retrieving API calls by status:', err);
      return [];
    }
  }

  async getFailedApiCalls(): Promise<ApiCallLog[]> {
    try {
      // Boolean keys can be problematic in some IndexedDB implementations
      // Filter after retrieval for reliability
      const allCalls = await this.indexedDbService.getAllItems<ApiCallLog>(
        this.DB_CONFIG,
        this.STORE_NAME
      );
      return allCalls.filter((call: any) => call.success === false);
    } catch (err) {
      console.error('Error retrieving failed API calls:', err);
      return [];
    }
  }

  async getSuccessfulApiCalls(): Promise<ApiCallLog[]> {
    try {
      // Boolean keys can be problematic in some IndexedDB implementations
      // Filter after retrieval for reliability
      const allCalls = await this.indexedDbService.getAllItems<ApiCallLog>(
        this.DB_CONFIG,
        this.STORE_NAME
      );
      return allCalls.filter((call: any) => call.success === true);
    } catch (err) {
      console.error('Error retrieving successful API calls:', err);
      return [];
    }
  }

  async getApiCallsInTimeRange(startTime: number, endTime: number): Promise<ApiCallLog[]> {
    try {
      const allCalls = await this.getAllApiCalls();
      return allCalls.filter((call: any) =>
        call.timestamp >= startTime && call.timestamp <= endTime
      );
    } catch (err) {
      console.error('Error retrieving API calls in time range:', err);
      return [];
    }
  }

  async getApiCallStats(): Promise<{
    totalCalls: number;
    successfulCalls: number;
    failedCalls: number;
    averageDuration: number;
    callsByMethod: Record<string, number>;
    callsByStatus: Record<number, number>;
    last24Hours: number;
    lastHour: number;
  }> {
    try {
      const calls = await this.getAllApiCalls();
      const now = Date.now();
      const oneDayAgo = now - 24 * 60 * 60 * 1000;
      const oneHourAgo = now - 60 * 60 * 1000;

      const stats = {
        totalCalls: calls.length,
        successfulCalls: calls.filter(c => c.success).length,
        failedCalls: calls.filter(c => !c.success).length,
        averageDuration: calls.reduce((sum, c) => sum + c.duration, 0) / calls.length || 0,
        callsByMethod: {} as Record<string, number>,
        callsByStatus: {} as Record<number, number>,
        last24Hours: calls.filter(c => c.timestamp >= oneDayAgo).length,
        lastHour: calls.filter(c => c.timestamp >= oneHourAgo).length
      };

      calls.forEach(call => {
        stats.callsByMethod[call.method] = (stats.callsByMethod[call.method] || 0) + 1;
        stats.callsByStatus[call.status] = (stats.callsByStatus[call.status] || 0) + 1;
      });

      return stats;
    } catch (err) {
      console.error('Error getting API call stats:', err);
      return {
        totalCalls: 0,
        successfulCalls: 0,
        failedCalls: 0,
        averageDuration: 0,
        callsByMethod: {},
        callsByStatus: {},
        last24Hours: 0,
        lastHour: 0
      };
    }
  }

  async deleteApiCall(id: string): Promise<void> {
    try {
      await this.indexedDbService.deleteItem(
        this.DB_CONFIG,
        this.STORE_NAME,
        id
      );
    } catch (err) {
      console.error('Error deleting API call:', err);
    }
  }

  async clearAllApiCalls(): Promise<void> {
    try {
      await this.indexedDbService.clearStore(this.DB_CONFIG, this.STORE_NAME);
    } catch (err) {
      console.error('Error clearing API calls:', err);
    }
  }

  async cleanOldApiCalls(hoursOld: number = 24): Promise<number> {
    try {
      const cutoffTime = Date.now() - (hoursOld * 60 * 60 * 1000);
      const allCalls = await this.getAllApiCalls();

      const callsToDelete = allCalls.filter(call => call.timestamp < cutoffTime);

      for (const call of callsToDelete) {
        await this.deleteApiCall(call.id);
      }

      return callsToDelete.length;
    } catch (err) {
      console.error('Error cleaning old API calls:', err);
      return 0;
    }
  }

  async exportApiCalls(startTime?: number, endTime?: number): Promise<string> {
    try {
      let calls: ApiCallLog[];

      if (startTime && endTime) {
        calls = await this.getApiCallsInTimeRange(startTime, endTime);
      } else {
        calls = await this.getAllApiCalls();
      }

      return JSON.stringify(calls, null, 2);
    } catch (err) {
      console.error('Error exporting API calls:', err);
      throw err;
    }
  }

  private generateLogId(): string {
    return `api_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private extractHeaders(request: HttpRequest<any>): { [key: string]: string } {
    const headers: { [key: string]: string } = {};
    request.headers.keys().forEach(key => {
      // Skip sensitive headers
      if (!key.toLowerCase().includes('authorization') &&
        !key.toLowerCase().includes('token') &&
        !key.toLowerCase().includes('cookie')) {
        const value = request.headers.get(key);
        if (value) {
          headers[key] = value;
        }
      }
    });
    return headers;
  }

  private extractParams(request: HttpRequest<any>): { [key: string]: string | string[] } {
    const params: { [key: string]: string | string[] } = {};
    request.params.keys().forEach(key => {
      const values = request.params.getAll(key);
      if (values) {
        params[key] = values.length === 1 ? values[0] : values;
      }
    });
    return params;
  }

  private sanitizeBody(body: any): any {
    if (!body) return null;

    try {
      const bodyStr = JSON.stringify(body);

      // Limit body size
      if (bodyStr.length > this.MAX_BODY_SIZE) {
        return {
          _truncated: true,
          _originalSize: bodyStr.length,
          _preview: bodyStr.substring(0, this.MAX_BODY_SIZE)
        };
      }

      // Remove sensitive fields
      const sanitized = JSON.parse(bodyStr);
      this.removeSensitiveFields(sanitized);

      return sanitized;
    } catch (err) {
      return { _error: 'Could not sanitize body' };
    }
  }

  private removeSensitiveFields(obj: any): void {
    if (typeof obj !== 'object' || obj === null) return;

    const sensitiveKeys = ['password', 'token', 'secret', 'apiKey', 'creditCard', 'ssn'];

    for (const key in obj) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        this.removeSensitiveFields(obj[key]);
      }
    }
  }

  private getBranchKey(): string | undefined {
    try {
      const branchSession = sessionStorage.getItem('selectedBranch');
      if (branchSession) {
        const branch = JSON.parse(branchSession);
        return branch?.branchKey || branch?.id;
      }
    } catch (err) {
      // Ignore errors
    }
    return undefined;
  }
}
