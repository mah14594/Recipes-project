import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../Recipe.model';
import { RecipesService } from '../recipe.service';
import { ShoppingService } from '../../shoping-list/shopping.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  // @Input() selectedRecipe: Recipe;
  selectedRecipe: Recipe;
  constructor(
    private recipeService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  onAddToShopping() {
    this.recipeService.addIngredientsToList(this.selectedRecipe.ingredients);
  }
  id = this.activatedRoute.snapshot.params['id'];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedRecipe = this.recipeService
        .getRecipes()
        .find((recipe) => recipe.id === +params['id']);
    });
  }
  onEditRecipe() {
    /* method1 : this.router.navigate([`recipes/${this.activatedRoute.snapshot.url}/edit`])*/
    /*method2: this.router.navigate(['edit'], { relativeTo: this.activatedRoute }); */
    //method3 :
    this.router.navigate(['../', this.id, 'edit'], {
      relativeTo: this.activatedRoute,
    });
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
  }
}
