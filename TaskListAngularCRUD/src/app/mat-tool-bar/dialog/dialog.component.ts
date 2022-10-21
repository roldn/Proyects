import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainTableComponent } from 'src/app/main-table/main-table.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

@Inject({
  providedIn: 'main-table'
})

export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  productForm !: FormGroup;
  actionBtn: string = "save";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>, public mainTable: MainTableComponent
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })

    if (this.editData) {
      this.actionBtn = "update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);

    }
  }

  addProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            alert("Product added succesfully.");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Error while adding the product.")
          }
        })
    }
  }



  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Product updated succesfully.");
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the record.");
        }

      })
  }

}
