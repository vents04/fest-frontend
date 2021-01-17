import { Component, OnInit } from '@angular/core';
import { WebRequestsService } from 'src/app/services/web-requests-service/web-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-url',
  templateUrl: './url.component.html',
  styleUrls: ['./url.component.scss']
})
export class UrlComponent implements OnInit {

  constructor(private webService: WebRequestsService, private activatedRoute: ActivatedRoute) { }

  currentObject: any;

  ngOnInit(): void {
    // Get url from backend
    /*
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.webService.getUrlInfo(id).subscribe((res: HttpResponse<any>) => {
      this.currentObject = JSON.parse(res.body);
    })
    */
    this.currentObject = {
      "url" : "http://localhost",
      "title" : "test",
      "favicon" : "",
      "period": "5min",
      "favorites": false,
      "method": "get",
      "methodBody": "None",
      "lastLog": "20-20-2020",
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
    }
  }
  openedLog: any;
  showLogModal: boolean = false;

  statusCodeTexts = new Map<number, string>();

  openLogModal(id: string) {
    console.log(id);
    this.showLogModal = true;
      for(let log of this.currentObject.logs) {
        if(log.Id == id) {
          console.log(id);
          log.url = this.currentObject.url;
          log.method = this.currentObject.method;
          this.openedLog = log;
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
