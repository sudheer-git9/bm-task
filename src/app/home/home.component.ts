import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BmApiService } from '../bm/bm-api.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  farmersFPOData: any;
  loader: boolean = true;
  tableColums: any;
  constructor(private bmApi: BmApiService, public dialog: MatDialog) {

  }


  ngOnInit() {
    this.getAllFarmersFPSData();
  }


  getAllFarmersFPSData() {
    this.loader = true;
    this.bmApi.getFpoDetails().subscribe((res: any) => {
      this.loader = false;
      if (res.data) {
        this.tableColums = this.flattenObject(res.data[0]);
        this.farmersFPOData = res.data;
      }
    });
  }

  flattenObject(obj: any, parentKey: string = ''): any[] {
    return Object.keys(obj).reduce((acc: any[], key: string) => {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        return acc.concat(this.flattenObject(obj[key], newKey));
      } else {
        return acc.concat({ key: newKey, name: this.snakeToTitleCase(newKey), isCombineColumn: newKey.includes('.'), combineColumn: newKey.includes('.') ? this.snakeToTitleCase((newKey.split('.'))[0]) : '' });
      }
    }, []);
  }

  snakeToTitleCase(str: string): string {
    str = str.includes('.') ? (str.split('.'))[1] : str;
    return str
      .replace(/_/g, ' ')
      .replace(/(?:^|\s)\S/g, (match) => {
        return match.toUpperCase();
      });
  }


  updateFpoDetails(row: any) {
    let dialogRef = this.dialog.open(DialogEditDialog, {
      data: {
        fpoDetailsId: row.fpoDetailsId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

  addFpoDetails() {
    let dialogRef = this.dialog.open(DialogEditDialog, {
      data: null,
      width: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }
}



@Component({
  selector: 'dialog-edit-dialog',
  templateUrl: 'dialog-edit-dialog.html',
  styleUrls: ['./home.component.scss']
})
export class DialogEditDialog implements OnInit {
  loader: boolean = true;
  fpoFormData = {
    "fpoName": "",
    "nameOfResourceInstitute": "",
    "spocName": "",
    "pocDesignation": "",
    "spocMobileNumber": "",
    "spocEmail": "",
    "spocWebsite": "",
    "registerOffice": "",
    "administrativeOffice": "",
    "rentOrLeased": "",
    "incorporationPeriod": "",
    "balanceSheet": 0,
    "subscribedShareCapital": 0,
    "panAvailable": "",
    "gstAvailable": "",
    "ceo": "",
    "totalNumberOfSmlFarmer": 0,
    "totalLandHoldingOfSmlFarmer": 0,
    "totalNumberOfMedFarmer": 0,
    "totalLandHoldingOfMedFarmer": 0,
    "totalNumberOfBigFarmer": 0,
    "totalLandHoldingOfBigFarmer": 0,
    "numberOfWomanShareHolders": 0,
    "numberOfStShareHolders": 0,
    "numberOfScShareHolders": 0,
    "increaseInLastSixMonths": 0,
    "numberOfActiveMembers": 0,
    "nonMembersAvailingServiceFpc": 0,
    "fpoRole": "Director",
    "fpoComplianceRequest": {
      "fertilizerValidityDate": "",
      "pesticideInsecticideValidityDate": "",
      "seedsValidityDate": "",
      "mportExportValidityDate": "",
      "directMarketingValidityDate": "",
      "fssaiValidityDate": "",
      "gstValidityDate": "",
      "pollutionValidityDate": ""
    },
    "fpoStaffRequest": {
      "name": "",
      "dateOfBirth": "",
      "qualification": "",
      "pan": "",
      "address": "",
      "occupation": "",
      "experience": 0,
      "landLine": "",
      "mobileNumber": "",
      "associatedWithOthInstitutions": "",
      "authorizedSignature": "",
      "dateOfAppointment": "",
      "salary": 0,
      "bankName": "",
      "bankAddress": "",
      "accountType": "",
      "accountNumber": "",
      "ifscCode": ""
    }
  };

  fpoFormDataTwo: any = {
    "staffPhoto": "",
    "registeredAddress": "",
    "rentOrLeased": "",
    "incorporationPeriod": "",
    "panAvailable": "",
    "gstAvailable": "",
    "fertilizerLicenseValidity": "",
    "pesticideInsecticideValidity": "",
    "seedsValidity": "",
    "importExportValidity": "",
    "directMarketingValidity": "",
    "fssaiValidity": "",
    "pollutionValidity": "",
    "gstValidity": "",
    "accountDetails": "",
  };
  fpoDetailsId: string = '';
  constructor(
    private bmApi: BmApiService,
    public dialogRef: MatDialogRef<DialogEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    if (this.data && this.data.fpoDetailsId) {
      this.getFpoDetaislById(this.data.fpoDetailsId);
    } else {
      this.loader = false;
    }

  }

  getFpoDetaislById(fpoDetailsId: any) {
    this.fpoDetailsId = fpoDetailsId;
    this.bmApi.getFPODetailById(fpoDetailsId).subscribe((res: any) => {
      this.loader = false;
      if (res.message == 'Success') {

        res.data.fpoComplianceRequest = res.data.fpoCompliance;
        res.data.fpoStaffRequest = res.data.fpoStaffDetails;

        delete res.data.audit;
        delete res.data.fpoCompliance;
        delete res.data.fpoStaffDetails;

        this.fpoFormData = {
          ...res['data']
        };

      }
    }, error => {
      this.loader = false;
    })
  }
  onChange(type: string, event: any) {
    if (event.target?.files) {
      this.fpoFormDataTwo[type] = event.target?.files[0];
    }
  }
  onSubmit() {
    const fpoDetailsRequest = JSON.stringify(this.fpoFormData);
    let formData = new FormData();
    // formData.append('fpoDetailsRequest', fpoDetailsRequest);
    // formData.append('fpoDetailsId', this.fpoDetailsId,);

    formData.append('fpoDetailsRequest', new Blob([JSON.stringify(fpoDetailsRequest)], { type: 'application/json' }))
    formData.append('fpoDetailsId', new Blob([JSON.stringify(this.fpoDetailsId)], { type: 'application/json' }))

    for (const key in this.fpoFormDataTwo) {
      if (Object.prototype.hasOwnProperty.call(this.fpoFormDataTwo, key)) {
        const element = this.fpoFormDataTwo[key];
        formData.append(key, element); //? element : new File([], '')
      }
    }

    this.bmApi.updateFPODetails(formData).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
    })

  }
  close() {
    this.dialogRef.close()
  }
}
