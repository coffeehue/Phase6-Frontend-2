import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class SignoutComponent implements OnInit {
  private _router: any;

  constructor() { }

  ngOnInit(): void {
   
  }
  logoutfunc()
  {
    localStorage.setItem('SeesionUser',"");
    this._router.navigateByUrl("/login");
  }

}
