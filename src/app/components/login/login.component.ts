import { Component, OnInit } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: Users[] = [];
  userid: Users;
  username : string;
  userpassword : string;
  
  constructor(private _userService: UsersService,private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      data => this.users = data
    )
      
  }
  getUsers() {
    this._userService.getUsers().subscribe(
      data => this.users = data
    )
  }

  getUserById(){
    this._userService.getUserByName(this.username).subscribe(
      data=>this.userid =data
    
    )
    
   this.checklogin()
    
  }
  checklogin()
  {
    if(this.userid.username==this.username && this.userid.password==this.userpassword)
    {
      localStorage.setItem('SeesionUser',this.userid.username.toString())
      localStorage.setItem('UserRole',this.userid.admin.toString())

      console.log(this.userid)
      console.log(this.username)
      this._router.navigateByUrl("/showmovies");
    }
    else{
    console.log(this.userid)
    }
  }

}
