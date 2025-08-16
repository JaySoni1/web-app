/** Angular Imports */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { SelfRunReportService } from '@fineract/client';

/**
 * Group Summary resolver.
 */
@Injectable()
export class GroupSummaryResolver {
  /**
   * @param {SelfRunReportService} SelfRunReportService Groups service.
   */
  constructor(private selfRunReportService: SelfRunReportService) {}

  /**
   * Returns the Group Summary data.
   * @param {ActivatedRouteSnapshot} route Route Snapshot.
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const groupId = route.parent.paramMap.get('groupId');
    // Use runReport1 with reportName and query params
    return this.selfRunReportService.runReport1({
      reportName: 'GroupSummaryCounts',
      // @ts-ignore: allow extra params for query
      R_groupId: groupId
    });
  }
}
