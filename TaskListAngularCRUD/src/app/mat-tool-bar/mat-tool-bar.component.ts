import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainTableComponent } from '../main-table/main-table.component';
import { ApiService } from '../services/api.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'mat-tool-bar',
  templateUrl: './mat-tool-bar.component.html',
  styleUrls: ['./mat-tool-bar.component.scss']
})

export class MatToolBarComponent implements OnInit {

  constructor(public dialog: MatDialog, private api: ApiService, public mainTable : MainTableComponent) { }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "30%"
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.mainTable.getAllProducts();
      }
    });
  }

  ngOnInit(): void {}

}
