import { Component, Inject, OnInit } from '@angular/core';
import { NbDialogRef, NB_DIALOG_CONFIG } from '@nebular/theme';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})
export class PostDialogComponent implements OnInit {

  constructor(protected dialogRef: NbDialogRef<PostDialogComponent>, @Inject(NB_DIALOG_CONFIG) public data) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
