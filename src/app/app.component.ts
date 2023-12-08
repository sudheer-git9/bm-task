import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { BmApiService } from './bm/bm-api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  constructor(private api: ApiService, private bmApi: BmApiService) {

  }
}