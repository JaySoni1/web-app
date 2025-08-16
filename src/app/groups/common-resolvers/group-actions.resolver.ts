/** Angular Imports */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

/** rxjs Imports */
import { Observable } from 'rxjs';

/** Custom Services */
import { GroupsService, CalendarService, LoanProductsService } from '@fineract/client';

/**
 * Group Actions data resolver.
 */
@Injectable()
export class GroupActionsResolver {
  /**
   * @param {GroupsService} groupsService,
   * @param {CalendarService} CalendarService,
   * @param {LoanProductsService} LoanProductsService
   */
  constructor(
    private groupsService: GroupsService,
    private calendarService: CalendarService,
    private loanProductsService: LoanProductsService
  ) {}

  /**
   * Returns the group actions data.
   * @param {ActivatedRouteSnapshot} route Route Snapshot
   * @returns {Observable<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const actionName = route.paramMap.get('action');
    const groupId = route.paramMap.get('groupId') || route.parent.parent.paramMap.get('groupId');
    switch (actionName) {
      case 'Attendance':
      case 'Manage Members':
      case 'Transfer Clients':
        return this.groupsService.delete11({ groupId: Number(groupId) });
      case 'Assign Staff':
        return this.loanProductsService.retrieveTemplate11({});
      case 'Close':
        return this.groupsService.retrieveTemplate7({ command: 'close' });
      case 'Attach Meeting':
        return this.calendarService.retrieveNewCalendarDetails({ entityId: Number(groupId), entityType: '2' });
      case 'Edit Meeting':
      case 'Edit Meeting Schedule':
        const calendarId = route.queryParamMap.get('calendarId');
        return this.calendarService.retrieveCalendar({
          entityId: Number(groupId),
          calendarId: Number(calendarId),
          entityType: '2'
        });
      default:
        return undefined;
    }
  }
}
