import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { BmApiService } from '../bm/bm-api.service';
import { Subscription } from 'rxjs';


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
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  title = 'bm-task';
  totalData: ApiResponse | undefined;
  loader: boolean = true;
  subscriptionTotalData: Subscription | undefined;
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
    this.subscriptionTotalData = this.api.getData().subscribe((res: ApiResponse) => {
      this.loader = false;
      this.totalData = res;
    }, error => {
      this.loader = false;
    })
  }

  ngOnDestroy() {
    this.subscriptionTotalData?.unsubscribe()
  }
}

@Component({
  selector: 'dialog-data-card-dialog',
  templateUrl: 'dialog-data-card-dialog.html',
  styleUrls: ['./stories.component.scss']
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
