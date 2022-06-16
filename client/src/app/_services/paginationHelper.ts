import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { PaginatedResult } from "../_models/pagination";

/**
import { HttpClient } from '@angular/common/http';
   *
   * @param url
   * @param params
   * @returns PaginatedResult<T>
   * 
   * Function extracted from members.service.
   * Refactoring so message.service has the same access but without a contructor it needs the http through the param
   */
 export function getPaginatedResult<T>(url, params, http: HttpClient) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return http
      .get<T>(url, {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          paginatedResult.result = res.body;

          if (res.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  /**
   *
   * @param pageNumber
   * @param pageSize
   * @returns HttpParams
   * 
   * Function extracted from members.service.
   */
   export function getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }