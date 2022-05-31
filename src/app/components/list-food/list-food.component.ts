import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { SelectItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { SignoutComponent } from '../signout/signout.component';
import { Bookings } from 'src/app/models/bookings';
import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-food',
  templateUrl: './list-food.component.html',
  styleUrls: ['./list-food.component.css'],
})
export class ListFoodComponent implements OnInit {
  food: Food[] = [];
  sortOptions: SelectItem[];

  sortOrder: number;
  sampel="sampleimage";

  sortField: string;
  filters = {
    keyword: '',
    sortBy: 'Name',
  };
  constructor(
    private _foodService: FoodService,
    private _signoutComponent: SignoutComponent,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('UserRole') != 'true') {
      this._router.navigateByUrl('/showfood');
    }
    this._foodService.getFoods().subscribe((data) => (this.food = data));
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
  }

  deleteFood(id: number) {
    this._foodService.deleteFood(id).subscribe((data) => {
      console.log('Deleted Response', data);
    });
  }

  listMovies() {
    this._foodService
      .getFoods()
      .subscribe((data) => (this.food = this.filterMovies(data)));
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

  logoutfunc() {
    this._signoutComponent.logoutfunc();
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
