import { Component, OnInit } from '@angular/core';
import { Recipe } from './Recipe.model';
import { RecipesService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeSerevice: RecipesService) {}

  ngOnInit(): void {
    this.recipeSerevice.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    });
  }
}
