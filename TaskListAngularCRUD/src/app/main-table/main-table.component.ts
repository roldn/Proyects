import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../mat-tool-bar/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss']
})

export class MainTableComponent implements OnInit {

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) { }

  getAllProducts() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the records")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: row
    }).afterClosed().subscribe(() => {this.getAllProducts()});
  }

  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next:(res)=>{
        alert("Deleted successfully");
        this.getAllProducts();
      },
      error:() => {
        alert("Error while deleting the product");
      }
    })
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

}
