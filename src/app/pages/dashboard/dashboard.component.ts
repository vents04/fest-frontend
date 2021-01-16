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
        {
          "status": 200,
          "text": "Success",
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
  }

}
