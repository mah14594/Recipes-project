import { Ingredient } from '../shared/ingredient.model';
//this model is used as a blueprint , to allow components instatiate objects from this class we add it in a folder
export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    id: number,
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
