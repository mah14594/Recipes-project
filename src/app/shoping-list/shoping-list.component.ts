import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css'],
})
export class ShopingListComponent implements OnInit {
  ingredients = [];
  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
  }
  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.ingredientAdded.subscribe((ing: Ingredient) => {
      this.ingredients.push(ing);
    });
  }
  onEditIngredient(id: number) {
    this.shoppingService.satrtEditing.next(id);
  }
}
