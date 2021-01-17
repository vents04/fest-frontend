import { Component, OnInit } from '@angular/core';
import { WebRequestsService } from 'src/app/services/web-requests-service/web-requests.service';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private webService: WebRequestsService, ) { }

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
      "method": "get",
      "logs" : [
        {
          "Id": "testId1",
          "status": 100,
          "text": "Information",
          "timeToComplete": 19103031,
          "dateAndTime": "20-20-2020"
        },
        {
          "Id": "testId2",
          "status": 200,
          "text": "Success",
          "timeToComplete": 19103031,
          "dateAndTime": "20-20-2020"
        },
        {
          "Id": "testId3",
          "status": 500,
          "text": "Server error",
          "timeToComplete": 19103031,
          "dateAndTime": "20-20-2020"
        },
        {
          "Id": "testId4",
          "status": 100,
          "text": "Information",
          "dateAndTime": "20-20-2020"
        },
        {
          "Id": "testId5",
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
      "method": "post",
      "logs" : [
        
      ]
    },
    {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": false,
      "method": "put",
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
      "method": "delete",
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
      "method": "put",
      "logs" : [
        {
          "status": 500,
          "text": "Server error",
          "dateAndTime": "20-20-2020"
        }
      ]
    },
  ];

  openedLog: any;
  showLogModal: boolean = false;

  statusCodeTexts = new Map<number, string>();

  ngOnInit(): void {
    this.statusCodeTexts.set(100, "Information");
    this.statusCodeTexts.set(200, "Success");
    this.statusCodeTexts.set(300, "Redirection");
    this.statusCodeTexts.set(400, "Client error");
    this.statusCodeTexts.set(500, "Server error");
  }

  openLogModal(id: string) {
    this.showLogModal = true;
    for(let url of this.urls) {
      for(let log of url.logs) {
        if(log.Id == id) {
          log.url = url.url;
          log.method = url.method;
          this.openedLog = log;
        }
      }
    }

    let logModal = document.querySelector("#log-modal") as HTMLElement;
    logModal.classList.add("is-active");
  }

  closeLogModal() {
    let logModal = document.querySelector("#log-modal") as HTMLElement;
    logModal.classList.remove("is-active");
  }

  redirect(id: string){
    this.router.navigate(['/dashboard'])
  }
}
