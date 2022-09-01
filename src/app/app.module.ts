import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import { ShopingEditComponent } from './shoping-list/shoping-edit/shoping-edit.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirectiveDirective } from './shared/dropdown-directive.directive';
import { ShoppingService } from './shoping-list/shopping.service';
import { Routes, RouterModule } from '@angular/router';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { RecipesService } from './recipes/recipe.service';
const routes = [
  { path: '', component: RecipesComponent },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      //we add new recipe path before id in order to inform angular that new recipe is not an id
      { path: 'new-recipe', component: EditRecipeComponent },
      { path: ':id', component: RecipeDetailsComponent },
      { path: ':id/edit', component: EditRecipeComponent },
    ],
  },
  { path: 'shopping-list', component: ShopingListComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    ShopingListComponent,
    ShopingEditComponent,
    RecipeItemComponent,
    DropdownDirectiveDirective,
    RecipeStartComponent,
    EditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [ShoppingService, RecipesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
