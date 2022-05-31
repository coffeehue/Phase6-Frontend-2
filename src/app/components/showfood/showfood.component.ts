import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { SignoutComponent } from '../signout/signout.component';

@Component({
  selector: 'app-showfood',
  templateUrl: './showfood.component.html',
  styleUrls: ['./showfood.component.css'],
})
export class ShowfoodComponent implements OnInit {
  food: Food[] = [];
  cart: Food = new Food();
  sortOrder: number;

  sortField: string;

  filters = {
    keyword: '',
    sortBy: 'Name',
  };
  constructor(
    private _foodService: FoodService,
    private _signoutComponent: SignoutComponent
  ) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('UserRole'));
    this._foodService.getFoods().subscribe((data) => (this.food = data));
  }

  deleteFood(id: number) {
    this._foodService.deleteFood(id).subscribe((data) => {
      console.log('Deleted Response', data);
    });
  }


  addToCart(id: number){
     this._foodService.getFood(id).subscribe(
      data => this.cart  = data
    )
    console.log(this.cart);
  }

  listMovies() {
    this._foodService
      .getFoods()
      .subscribe((data) => (this.food = this.filterMovies(data)));
  }

  logoutfunc() {
    this._signoutComponent.logoutfunc();
  }

  filterMovies(food: Food[]) {
    return food
      .filter((e) => {
        return e.foodItem
          .toLowerCase()
          .includes(this.filters.keyword.toLowerCase());
      })
      .sort((a, b) => {
        if (this.filters.sortBy === 'Name') {
          return a.foodItem.toLowerCase() < b.foodItem.toLowerCase() ? -1 : 1;
        } else if (this.filters.sortBy === 'Price') {
          return a.price > b.price ? -1 : 1;
        } else if (this.filters.sortBy === 'Cuisine') {
          return a.cuisine.toLowerCase() < b.cuisine.toLowerCase() ? -1 : 1;
        }
      });
  }
}
