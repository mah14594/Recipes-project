import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../Recipe.model';
import { RecipesService } from '../../recipe.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor(
    private recipeService: RecipesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
