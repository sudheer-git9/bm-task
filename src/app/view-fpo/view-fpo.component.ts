import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BmApiService } from '../bm/bm-api.service';

@Component({
  selector: 'app-view-fpo',
  templateUrl: './view-fpo.component.html',
  styleUrls: ['./view-fpo.component.scss']
})
export class ViewFpoComponent {
  loader: boolean = true;
  fpoDetails: any;
  fpoDetailsId: any;

  constructor(private activeRoute: ActivatedRoute, private bmApi: BmApiService, private router: Router) {
    if (this.activeRoute.snapshot.params['fpoDetailsId']) {
      this.fpoDetailsId = this.activeRoute.snapshot.params['fpoDetailsId'];
    }
  }
  ngOnInit() {
    this.getFpoDetaislById(this.fpoDetailsId);
  }
  getFpoDetaislById(fpoDetailsId: any) {
    this.fpoDetailsId = fpoDetailsId;
    this.bmApi.getFPODetailById(fpoDetailsId).subscribe((res: any) => {
      this.loader = false;
      if (res.message == 'Success') {
        this.fpoDetails = res.data
      }
    }, error => {
      this.loader = false;
    })
  }
}
