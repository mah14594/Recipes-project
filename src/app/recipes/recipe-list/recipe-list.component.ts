import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../Recipe.model';
import { RecipesService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  //determine that the type of this variable is array of Recipe object (Recipe model)
  recipes: Recipe[] = [];
  constructor(
    private recipeService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  onAddRecipe() {
    this.router.navigate(['new-recipe'], {
      relativeTo: this.activatedRoute,
    });
  }
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }
}
