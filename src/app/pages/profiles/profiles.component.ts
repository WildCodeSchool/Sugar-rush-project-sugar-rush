import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { SugarMeterApiService } from 'src/app/services/sugar-meter-api.service';
import { LOGOS } from 'src/app/shared/globals/sugar-meter';
import { Logo } from 'src/app/shared/interfaces/logo';
import { Profile } from 'src/app/shared/interfaces/profile';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {

  @Input()
  public profile!: Profile;

  private _sugarDatas!: number;

  public logos = LOGOS;

  public profileModificationForm!: FormGroup

  @Output()
  profilesUpdated = new EventEmitter<Boolean>();

  constructor(private snackBarService: SnackBarService, private fb: FormBuilder, private sugarMeterService: SugarMeterApiService) {}

  ngOnInit(): void {
    this.profileModificationForm = this.fb.group({
      name: [this.profile.name],
      logo: [this.profile.logo],
    });
    this.sugarMeterService.getSugarDatasByProfileId(this.profile.id)
      .subscribe(datas => {
        this._sugarDatas = datas;
      });
  }

  onSubmit() {
    if (this.profileModificationForm.valid) {
      if (this.profileModificationForm.value.name === '') {
        this.profileModificationForm.value.name = this.profile.name;
      }
      if (this.profileModificationForm.value.logo === '') {
        this.profileModificationForm.value.logo = this.profile.logo;
      }
      const profile = {
        id: this.profile.id,
        name: this.profileModificationForm.value.name!,
        birthDate: this.profile.birthDate,
        logo: this.profileModificationForm.value.logo!,
        user: this.profile.user
      };
      this.sugarMeterService.updateProfile(this.profile.id, profile).subscribe(
        () => {
          this.profilesUpdated.emit(true)
          this.snackBarService.openSnackBar('Profil ' + profile.name + ' modifié !', 'Fermer');
        });
    }
  }

  onDatasUpdated(event: Boolean) {
    if (event)
      this.sugarMeterService.getSugarDatasByProfileId(this.profile.id)
        .subscribe(datas => {
          this._sugarDatas = datas;
        });
  }

  deleteProfile() {
    this.sugarMeterService.deleteProfile(this.profile.id).subscribe(
      () => {
        this.profilesUpdated.emit(true)
        this.snackBarService.openSnackBar('Profil ' + this.profile.name + ' supprimé !', 'Fermer');
      });
  }

  isSelected(logoValue: string): boolean {
    return this.profileModificationForm.get('logo')?.value === logoValue;
  }

  selectLogo(logo: Logo): void {
    this.profileModificationForm.get('logo')?.setValue(logo.value);
  }

  get sugarDatas(): number {
    return this._sugarDatas;
  }
}
