import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: Users = new Users();

  value1: string;

    value2: string;

    value3: string;

    value4: string;

  constructor(private _userService: UsersService, 
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
  }

  saveUser() {
    this._userService.saveUser(this.user).subscribe(
      data=>{
        console.log('response', data);
        this._router.navigateByUrl("/login");
      }
    )
  }

}
