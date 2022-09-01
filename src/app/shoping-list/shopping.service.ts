import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class ShoppingService {
  satrtEditing = new Subject<Number>();
  ingredientAdded = new EventEmitter<Ingredient>();
  private ingredients = [
    new Ingredient('apples', 5),
    new Ingredient('tomatos', 10),
  ];
  getIngredients() {
    return this.ingredients;
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredients(ings: Ingredient[]) {
    this.getIngredients().push(...ings);
  }
  updateIngredient(id: number, updatedIngredient: Ingredient) {
    this.ingredients[id] = updatedIngredient;
  }
  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
  }
}
