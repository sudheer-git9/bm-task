import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BmApiService } from '../bm/bm-api.service';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
const moment = (_moment as any).default ? (_moment as any).default : _moment;
// tslint:disable-next-line:no-duplicate-imports

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-fpo',
  templateUrl: './add-fpo.component.html',
  styleUrls: ['./add-fpo.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddFpoComponent {
  fpoForm: FormGroup | undefined;
  fpoComplainceForm: FormGroup | undefined;
  fpoStaffForm: FormGroup | undefined;
  fpoDetailsId: any;
  loader: boolean = true;
  fpoDetails: any;
  fpoOthersForm: FormGroup | undefined;
  constructor(private fb: FormBuilder, private activeRoute: ActivatedRoute, private bmApi: BmApiService, private router: Router) {
    if (this.activeRoute.snapshot.params['fpoDetailsId']) {
      this.fpoDetailsId = this.activeRoute.snapshot.params['fpoDetailsId'];
    }
  }

  ngOnInit() {
    this.initForm();
    if (this.fpoDetailsId) {
      this.getFpoDetaislById(this.fpoDetailsId);
    }
  }
  getFpoDetaislById(fpoDetailsId: any) {
    this.fpoDetailsId = fpoDetailsId;
    this.bmApi.getFPODetailById(fpoDetailsId).subscribe((res: any) => {
      this.loader = false;
      if (res.message == 'Success') {
        this.fpoForm?.patchValue(res.data);
        this.fpoComplainceForm?.patchValue(res.data.fpoCompliance);
        this.fpoStaffForm?.patchValue(res.data.fpoStaffDetails);


        // Set the value of yourDateFormControl
        this.fpoComplainceForm.get('fertilizerValidityDate').setValue(res.data.fpoCompliance.fertilizerValidityDate ? new Date(res.data.fpoCompliance.fertilizerValidityDate) : '');
        this.fpoComplainceForm.get('pesticideInsecticideValidityDate').setValue(res.data.fpoCompliance.pesticideInsecticideValidityDate ? new Date(res.data.fpoCompliance.pesticideInsecticideValidityDate) : '');
        this.fpoComplainceForm.get('seedsValidityDate').setValue(res.data.fpoCompliance.seedsValidityDate ? new Date(res.data.fpoCompliance.seedsValidityDate) : '');
        this.fpoComplainceForm.get('importExportValidityDate').setValue(res.data.fpoCompliance.importExportValidityDate ? new Date(res.data.fpoCompliance.importExportValidityDate) : '');
        this.fpoComplainceForm.get('directMarketingValidityDate').setValue(res.data.fpoCompliance.directMarketingValidityDate ? new Date(res.data.fpoCompliance.directMarketingValidityDate) : '');
        this.fpoComplainceForm.get('fssaiValidityDate').setValue(res.data.fpoCompliance.fssaiValidityDate ? new Date(res.data.fpoCompliance.fssaiValidityDate) : '');
        this.fpoComplainceForm.get('gstValidityDate').setValue(res.data.fpoCompliance.gstValidityDate ? new Date(res.data.fpoCompliance.gstValidityDate) : '');
        this.fpoComplainceForm.get('pollutionValidityDate').setValue(res.data.fpoCompliance.pollutionValidityDate ? new Date(res.data.fpoCompliance.pollutionValidityDate) : '');

        this.fpoStaffForm.get('dateOfBirth').setValue(res.data.fpoCompliance.dateOfBirth ? new Date(res.data.fpoCompliance.dateOfBirth) : '');
        this.fpoStaffForm.get('dateOfAppointment').setValue(res.data.fpoCompliance.dateOfAppointment ? new Date(res.data.fpoCompliance.dateOfAppointment) : '');

      }
    }, error => {
      this.loader = false;
    })
  }
  initForm() {
    this.fpoForm = this.fb.group({
      fpoDetailsId: [],
      fpoName: [''],
      nameOfResourceInstitute: [''],
      spocName: [''],
      spocDesignation: [],
      spocMobileNumber: [''],
      spocEmail: [''],
      spocWebsite: [''],
      registerOffice: [''],
      registerOfficeImage: [],
      administrativeOffice: [''],
      rentOrLeased: [''],
      rentOrLeasedImage: [],
      incorporationPeriod: [''],
      incorporationPeriodImage: [],
      balanceSheet: [],
      subscribedShareCapital: [],
      panAvailable: [],
      panImage: [],
      gstAvailable: [],
      gstImage: [],
      ceo: [],
      totalNumberOfSmlFarmer: [],
      totalLandHoldingOfSmlFarmer: [],
      totalNumberOfMedFarmer: [],
      totalLandHoldingOfMedFarmer: [],
      totalNumberOfBigFarmer: [],
      totalLandHoldingOfBigFarmer: [],
      numberOfWomanShareHolders: [],
      numberOfStShareHolders: [],
      numberOfScShareHolders: [],
      increaseInLastSixMonths: [],
      numberOfActiveMembers: [],
      nonMembersAvailingServiceFpc: [],
      fpoRole: ['']
    });
    this.fpoComplainceForm = this.fb.group({
      fpoComplianceId: [],
      fertilizerValidityDate: [],
      fertilizerImage: [],
      pesticideInsecticideValidityDate: [],
      pesticideInsecticideImage: [],
      seedsValidityDate: [],
      seedsImage: [],
      importExportValidityDate: [],
      importExportImage: [],
      directMarketingValidityDate: [],
      directMarketingImage: [],
      fssaiValidityDate: [],
      fssaiImage: [],
      gstValidityDate: [],
      gstImage: [],
      pollutionValidityDate: [],
      pollutionImage: [],
    });
    this.fpoStaffForm = this.fb.group({
      fpoStaffDetailsId: [],
      name: [''],
      fpoStaffImage: [''],
      dateOfBirth: [],
      qualification: [''],
      pan: [''],
      address: [''],
      occupation: [''],
      experience: [],
      landLine: [''],
      mobileNumber: [''],
      associatedWithOthInstitutions: [''],
      authorizedSignature: [],
      dateOfAppointment: [],
      salary: [],
      bankName: [''],
      bankAddress: [''],
      accountType: [''],
      accountNumber: [''],
      ifscCode: [''],
      bankImage: ['']
    });
    this.fpoOthersForm = this.fb.group({
      staffPhoto: [],
      registeredAddress: [],
      rentOrLeased: [''],
      incorporationPeriod: [''],
      panAvailable: [''],
      gstAvailable: [''],
      fertilizerLicenseValidity: [''],
      pesticideInsecticideValidity: [''],
      seedsValidity: [''],
      importExportValidity: [''],
      directMarketingValidity: [''],
      fssaiValidity: [''],
      pollutionValidity: [''],
      gstValidity: [''],
      accountDetails: [],
      fpoDetailsId: ['']
    });

  }
  uploadFile(fc: string, e: any) {
    this.fpoOthersForm.get(fc).setValue(e.target.files[0]);
  }
  onSubmit() {
    // Handle form submission logic here
    console.log(this.fpoForm?.value);
    let fpoDetailsRequest = {
      ...this.fpoForm.value,
      fpoComplianceRequest: this.fpoComplainceForm.value,
      fpoStaffRequest: this.fpoStaffForm.value,
    }
    fpoDetailsRequest.fpoComplianceRequest.ertilizerValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.ertilizerValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoComplianceRequest.pesticideInsecticideValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.pesticideInsecticideValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoComplianceRequest.seedsValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.seedsValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoComplianceRequest.mportExportValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.mportExportValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoComplianceRequest.directMarketingValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.directMarketingValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoComplianceRequest.fssaiValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.fssaiValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoComplianceRequest.gstValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.gstValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoComplianceRequest.pollutionValidityDate = new moment(fpoDetailsRequest.fpoComplianceRequest.pollutionValidityDate).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoStaffRequest.dateOfBirth = new moment(fpoDetailsRequest.fpoComplianceRequest.dateOfBirth).format('YYYY-MM-DD');
    fpoDetailsRequest.fpoStaffRequest.dateOfAppointment = new moment(fpoDetailsRequest.fpoComplianceRequest.dateOfAppointment).format('YYYY-MM-DD');

    let formData = new FormData();

    formData.append('fpoDetailsRequest', JSON.stringify(fpoDetailsRequest))
    formData.append('fpoDetailsId', this.fpoDetailsId);

    for (const key in this.fpoOthersForm.value) {
      if (Object.prototype.hasOwnProperty.call(this.fpoOthersForm.value, key)) {
        const element = this.fpoOthersForm.value[key];
        formData.append(key, element); //? element : new File([], '')
      }
    }
    this.bmApi.updateFPODetails(formData).subscribe((res: any) => {
      console.log(res);
    }, (error: any) => {
    })

  }
}
