import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipe.service';
import { Recipe } from '../Recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !isNaN(params['id']);
      console.log(this.editMode);
      console.log(this.id);
      this.initForm();
    });
  }
  initForm() {
    let recipeData = { name: '', imgPath: '', description: '' };
    let recipeIngredients = new FormArray([]);
    const editedRecipe = this.recipeService.getRecipes()[this.id];

    if (this.editMode) {
      recipeData.name = editedRecipe.name;
      recipeData.imgPath = editedRecipe.imagePath;
      recipeData.description = editedRecipe.description;
      if (editedRecipe.ingredients && editedRecipe.ingredients.length !== 0) {
        for (let ing of editedRecipe.ingredients)
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
      }
      // recipeData.ingredients = .ingredients;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeData.name, Validators.required),
      imgPath: new FormControl(recipeData.imgPath, Validators.required),
      description: new FormControl(recipeData.description, [
        Validators.required,
        Validators.minLength(5),
      ]),
      ingredients: recipeIngredients,
    });
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onSubmit() {
    const l = this.recipeService.getRecipes().length;
    let ingredients = [];
    if (this.controls.length > 0) {
      for (let i of this.controls) {
        const newIng = new Ingredient(i.value['name'], i.value['amount']);
        ingredients.push(newIng);
      }
    }

    console.log(this.controls);
    const recipeData = {
      name: this.recipeForm.value['name'],
      imgPath: this.recipeForm.value['imgPath'],
      description: this.recipeForm.value['description'],
      ingredients,
    };
    let newRecipe = new Recipe(
      l, //add new id
      recipeData.name,
      recipeData.description,
      recipeData.imgPath,
      recipeData.ingredients
    );
    if (this.editMode) {
      newRecipe = { ...newRecipe, id: this.id }; //use the same object but updating id
      this.recipeService.updateRecipe(newRecipe.id, newRecipe);
    } else {
      console.log(newRecipe);
      console.log(this.recipeService.getRecipes());
      this.recipeService.addRecipe(newRecipe);
    }
  }
  onDeleteIngredient(id) {
    this.controls.splice(id, 1);
  }
  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
