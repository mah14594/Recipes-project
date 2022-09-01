import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css'],
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingService: ShoppingService) {}
  @ViewChild('nameInput') ingName: ElementRef;
  @ViewChild('amountInput') ingAmount: ElementRef;
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  @Input() ingredient: Ingredient;
  editSubscription: Subscription;
  editMode = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient;
  clearHandler() {
    this.ingredientForm.form.patchValue({
      ingName: '',
      ingAmount: '',
    });
    this.ingredientForm.form.markAsUntouched();
  }
  deleteHandler() {
    this.shoppingService.deleteIngredient(this.editedIngredientIndex);
    this.clearHandler();
    this.editMode = false;
  }
  onSubmit() {
    const newIngName = this.ingredientForm.value['ingName'];
    const newIngAmount = +this.ingredientForm.value['ingAmount'];
    if (newIngName.length === 0 || newIngAmount === null) {
      return;
    }
    const newIng = new Ingredient(newIngName, newIngAmount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editedIngredientIndex, newIng);
    } else {
      this.shoppingService.ingredientAdded.emit(newIng);
    }
    //we can add this to clear handler and use clear handler here :
    //and this is a better approach , but i used this approach to indicate that there is two methods
    //declrative approach to reset the form :
    this.ingredientForm.form.reset();
    this.editMode = false;
    //imperative approach to reset the form
    // this.ingredientForm.form.patchValue({
    //   ingName: '',
    //   ingAmount: '',
    // });
    // this.ingredientForm.form.markAsUntouched();
  }

  ngOnInit(): void {
    console.log('run');
    this.editSubscription = this.shoppingService.satrtEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIngredientIndex = index;
        this.editedIngredient = this.shoppingService.getIngredient(index);
        console.log(this.editedIngredient);
        this.ingredientForm.setValue({
          ingName: this.editedIngredient.name,
          ingAmount: this.editedIngredient.amount,
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
