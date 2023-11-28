import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

interface Content {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface ApiResponse {
  posts: Content[];
  total: number;
  skip: number;
  limit: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bm-task';
  totalData: ApiResponse | undefined;

  constructor(private api: ApiService, public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.getData();
  }

  openDialog(index: number) {
    this.dialog.open(DialogDataCardDialog, {
      data: {
        ...this.totalData,
        index: index
      },
      maxWidth: "700px"
    });
  }
  getData() {
    this.api.getData().subscribe((res: ApiResponse) => {
      this.totalData = res;
    })
  }
}

@Component({
  selector: 'dialog-data-card-dialog',
  templateUrl: 'dialog-data-card-dialog.html',
  styleUrls: ['./app.component.scss']
})
export class DialogDataCardDialog {
  constructor(public dialogRef: MatDialogRef<DialogDataCardDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  close() {
    this.dialogRef.close()
  }

  onNext() {
    this.data.index++;
  }
  onPrev() {
    this.data.index--;
  }
}
