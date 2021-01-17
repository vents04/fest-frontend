import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UrlService } from 'src/app/service/url-service/url.service';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.scss']
})
export class AddUrlComponent implements OnInit {

  constructor(private urlService: UrlService) { }

  keyPlacehodler: string = "Key...";
  valuePlacehodler: string = "Value...";

  maximumMilliseconds: number = 2628000000;
  showCustomInput: boolean = false;

  headersCount: number = 0;

  showRequestBody: boolean = false;

  ngOnInit(): void {
    this.addHeadersElement();
  }

  addHeadersElement() {
    let headersSection = document.querySelector("#headers-section") as HTMLElement;

    let doubleInput = document.createElement("div");
    doubleInput.classList.add("min-section-double-input");
    doubleInput.setAttribute("id", this.headersCount.toString());

    let keyInput = document.createElement("input");
    keyInput.classList.add("add-url-input");
    keyInput.placeholder = this.keyPlacehodler;
    keyInput.type = "text";

    let valueInput = document.createElement("input");
    valueInput.classList.add("add-url-input");
    valueInput.placeholder = this.valuePlacehodler;
    valueInput.type = "text";

    let deleteButton = document.createElement("i");
    deleteButton.classList.add("material-icons");
    deleteButton.setAttribute("color", "red");
    deleteButton.innerHTML = "close";
    deleteButton.addEventListener("click", function() {
      doubleInput.remove();
    });

    doubleInput.appendChild(keyInput);
    doubleInput.appendChild(valueInput);
    doubleInput.appendChild(deleteButton);

    headersSection.appendChild(doubleInput);

    this.headersCount++;
  }

  deleteHeadersElement (id: number){
    console.log(id);
  }

  methodUpdated(method: string){
    (method == 'post' || method == 'put' || method == 'delete') ? this.showRequestBody = true : this.showRequestBody = false;
  }

  addUrl() {
    let body = '';
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const url = (document.getElementById('url') as HTMLInputElement).value;
    const method = (document.getElementById('method') as HTMLInputElement).value;
    const contentType = (document.getElementById('contentType') as HTMLInputElement).value;
    if (method != 'get') body = (document.getElementById('body') as HTMLInputElement).value;
    const period = (document.getElementById('period') as HTMLInputElement).value;

    this.urlService.addURL(title, url, method, contentType, body, parseInt(period)).subscribe((res: HttpResponse<any>) => {

    })
  }

}
