import { Component, OnInit } from '@angular/core';
import { WebRequestsService } from 'src/app/services/web-requests-service/web-requests.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private webService: WebRequestsService) { }

  monitoredWebsites: Array<Object> = [];

  monitoredWebsitesByDate: Array<Object> = [];
  monitoredWebsitedByReturnCode: Array<Object> = [];
  monitoredWebsitesByName: Array<Object> = [];

  sortRequest: string = "name";

  ngOnInit(): void {
    this.webService.getMonitoredWebsites(this.sortRequest).subscribe((res: HttpResponse<any>) => {
      this.monitoredWebsites = JSON.parse(res.body);
    })
  }

}
