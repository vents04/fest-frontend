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

  urls : Array<any> = [
    {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": false,
      "logs" : [
        {
          "status": 100,
          "text": "Information",
          "dateAndTime": "20-20-2020"
        },
        {
          "status": 200,
          "text": "Success",
          "dateAndTime": "20-20-2020"
        },
        {
          "status": 500,
          "text": "Server error",
          "dateAndTime": "20-20-2020"
        },
        {
          "status": 100,
          "text": "Information",
          "dateAndTime": "20-20-2020"
        },
        {
          "status": 100,
          "text": "Information",
          "dateAndTime": "20-20-2020"
        }
      ]
    },
    {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": true,
      "logs" : [
        
      ]
    },
    {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": false,
      "logs" : [
        {
          "status": 300,
          "text": "Redirection",
          "dateAndTime": "20-20-2020"
        }
      ]
    },
    {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": true,
      "logs" : [
        {
          "status": 400,
          "text": "Client error",
          "dateAndTime": "20-20-2020"
        }
      ]
    },
    {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": false,
      "logs" : [
        {
          "status": 500,
          "text": "Server error",
          "dateAndTime": "20-20-2020"
        }
      ]
    },
  ];

  ngOnInit(): void {
    this.webService.getMonitoredWebsites(this.sortRequest).subscribe((res: HttpResponse<any>) => {
      this.monitoredWebsites = JSON.parse(res.body);
    })
  }

}
