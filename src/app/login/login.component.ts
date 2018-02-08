import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MessagingService } from '../messaging.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ""

  constructor(private ms: MessagingService, private ds: DataService, private router: Router) { }

  ngOnInit() {
    this.ms.initialize()
  }

  onSubmit() {
    this.authenticate(this.username)
  }

  authenticate(username: string) {

    this.ms.getUserJwt(username).then((userJwt) => {
      this.ms.client.login(userJwt).then(app => {
        this.ds.app = app
        this.router.navigate(['/conversations']);
      })
    })
  }

}
