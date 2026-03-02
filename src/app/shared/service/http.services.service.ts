import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpServices {
  private http = inject(HttpClient);

  getHttp<T>(url: string, params?: HttpParams, isRemoveAuthToken?: boolean): Observable<T> {
    const finalUrl = this.buildUrl(url, (isRemoveAuthToken ?? false));
    return this.http.get<T>(finalUrl, { params });
  }

  postHttp<T>(url: string, data: any, isRemoveAuthToken?: boolean): Observable<T> {
    const finalUrl = this.buildUrl(url, (isRemoveAuthToken ?? false));
    return this.http.post<T>(finalUrl, data);
  }

  putHttp<T>(url: string, data: any, isRemoveAuthToken?: boolean): Observable<T> {
    const finalUrl = this.buildUrl(url, (isRemoveAuthToken ?? false));
    return this.http.put<T>(finalUrl, data);
  }

  deleteHttp<T>(url: string, isRemoveAuthToken?: boolean): Observable<T> {
    const finalUrl = this.buildUrl(url, (isRemoveAuthToken ?? false));
    return this.http.delete<T>(finalUrl);
  }

  /** Returns file as a Blob (PDF, CSV, etc.) */
  getBlob(url: string, acceptHeaders?: string, isRemoveAuthToken?: boolean): Observable<Blob> {
    const httpHeaders = acceptHeaders ? new HttpHeaders({ 'Accept': acceptHeaders }) : undefined;
    const finalUrl = this.buildUrl(url, (isRemoveAuthToken ?? false));
    return this.http.get(finalUrl, { responseType: 'blob' as 'blob', headers: httpHeaders });
  }

  /** Returns full response for observing content-disposition */
  getFileResponse(url: string, method: 'GET' | 'POST' = 'GET', data?: any, isRemoveAuthToken?: boolean): Observable<any> {
    const options = { responseType: 'blob' as 'json', observe: 'response' as 'response' };
    const finalUrl = this.buildUrl(url, (isRemoveAuthToken ?? false));
    return method === 'GET'
      ? this.http.get(finalUrl, options)
      : this.http.post(finalUrl, data, options);
  }

  /** Handles multipart file uploads */
  uploadFile(url: string, file: File, isRemoveAuthToken?: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const finalUrl = this.buildUrl(url, (isRemoveAuthToken ?? false));
    return this.http.post(finalUrl, formData);
  }

  private buildUrl(url: string, skipAuth: boolean): string {
    return skipAuth ? `${url}?RemoveAuthToken` : url;
  }
}