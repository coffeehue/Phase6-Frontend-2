import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
})
export class AddFoodComponent implements OnInit {
  imageSrc: string = '';
  food: Food = new Food();
  constructor(
    private _foodService: FoodService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem("UserRole")!="true"){
      this._router.navigateByUrl("/showfood");
    }
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if(isIdPresent){
     const id = +this._activatedRoute.snapshot.paramMap.get('id')
      this._foodService.getFood(id).subscribe(
        data => this.food  = data
      )
    }
  }

  saveFood() {
    this._foodService.saveFood(this.food).subscribe(
      data=>{
        console.log('response', data);
        this._router.navigateByUrl("/showfood");
      }
    )
  }

  deleteFood(id: number){
    this._foodService.deleteFood(id).subscribe(
      data => {
        console.log('Deleted Response',data);
        this._router.navigateByUrl('/showfood');
      }
    )
  }

}
