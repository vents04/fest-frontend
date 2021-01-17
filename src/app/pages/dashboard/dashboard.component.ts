import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  urls : Array<any> = [
    {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": false,
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

}
