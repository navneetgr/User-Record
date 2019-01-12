import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      ajax: this.appService.userDataUrl,
      columns: [{
        title: 'ID',
        data: '_id'
      }, {
        title: 'First name',
        data: 'fname'
      }, {
        title: 'Last name',
        data: 'lname'
      }]
    };
  }
}