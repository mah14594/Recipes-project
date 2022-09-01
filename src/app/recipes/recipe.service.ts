import { Ingredient } from './../shared/ingredient.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './Recipe.model';
import { ShoppingService } from '../shoping-list/shopping.service';
@Injectable()
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();
  constructor(private SlService: ShoppingService) {}
  private recipes: Recipe[] = [
    //instatiate a new object from Recipe class
    new Recipe(
      0,
      'Test recipe',
      'here is the description of the test recipe',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [new Ingredient('ing1', 1), new Ingredient('ing2', 3)]
    ),
    new Recipe(
      1,
      'Test recipe2',
      'here is the description of the test recipe2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg',
      [new Ingredient('ing3', 4), new Ingredient('ing4', 5)]
    ),
  ];
  // why we use private and getter? recipes cannt be accessed from outside this class,
  //inside the getter method we make a copy of the array ,
  //so that the original array not affected (refernce type variable)
  getRecipes() {
    return this.recipes;
  }
  // use event emmiter that indicates that the array of ingredients is changed
  addIngredientsToList(ingredients: Ingredient[]) {
    this.SlService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  updateRecipe(id, recipe: Recipe) {
    this.recipes[id] = recipe;
  }
  deleteRecipe(id) {
    this.recipes.splice(id, 1);
  }
}
