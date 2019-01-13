import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, Renderer } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  status: boolean = false;
  statusfail: boolean = false;
  index: number = 0;

  constructor(
    private appService: AppService,
    private renderer: Renderer
  ) { }

  ngOnInit() {
    this.getUserData();
    this.dtTrigger.subscribe();
  }

  getUserData() {
    let that = this;
    that.index = 0;

    this.dtOptions = {
      ajax: this.appService.userDataUrl,
      columns: [{
        title: '#',
        data: 'id',
        render: function (data: any, type: any, full: any) {
          that.index++;
          return that.index;
        }
      }, {
        title: 'First name',
        data: 'fname'
      }, {
        title: 'Last name',
        data: 'lname'
      }, {
        title: 'Email',
        data: 'email'
      }, {
        title: 'Birth Date',
        data: 'dob'
      }, {
        title: 'Gender',
        data: 'gender'
      }, {
        title: 'Mobile',
        data: 'mobile'
      }, {
        title: 'City',
        data: 'city'
      }, {
        title: 'Address',
        data: 'address'
      }, {
        title: 'Actions',
        data: '_id',
        render: function (data: any, type: any, full: any) {
          return '<button type="button" removeUser="' + data + '" class="btn btn-danger btn-sm action-btn" title="Delete User">Delete</button>';
        }
      }]
    };
  }

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.renderer.listenGlobal('document', 'click', (event) => {
      if (event.target.hasAttribute('removeUser')) {
        let recordId = event.target.getAttribute('removeUser');
        this.appService.deleteUser(recordId).subscribe(
          response => {
            this.rerender();
            this.status = true;
            this.statusfail = false;
          },
          error => {
            this.status = false;
            this.statusfail = true;
          }
        );

      }
    });
  }

  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
      this.index = 0;
    });
  }

  ngOnDestroy() {
    if (this.dtTrigger != null) {
      this.dtTrigger.unsubscribe();
    }
  }
}