import { Component, TemplateRef, ViewChild } from '@angular/core';
import { APP_ROUTES } from '../shared/globals/routes';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionComponent } from '../components/user/connection/connection.component';
import { Category } from '../shared/interfaces/category';
import { CategoriesApiService } from '../services/categories-api.service';
import { UserService } from '../services/user.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { SnackBarService } from '../services/snack-bar.service';
import { Authorities } from '../shared/interfaces/authorities';
import { isFormArray } from '@angular/forms';
import { isDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public APP_ROUTES = APP_ROUTES;

  private _categories!: Category[];

  user$ = this.userService.user;

  @ViewChild(MatMenuTrigger)
  menuTrigger!: MatMenuTrigger;

  constructor(public categoriesService: CategoriesApiService, private dialog: MatDialog, private userService: UserService, private snackBarService: SnackBarService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => {
        this._categories = categories;
      });
  }

  openModal() {
    const dialogRef = this.dialog.open(ConnectionComponent, {
      panelClass: 'modal-login',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  logout() {
    this.userService.logoutUser();
    this.snackBarService.openSnackBar('Vous êtes déconnecté !', "Fermer");
  }

  checkAdmin(authorities : Authorities[] | undefined) {
    let isAdmin = false;
    if (authorities == undefined)
      return false;
    for (let authority of authorities) {
      if (authority.authority == "ROLE_ADMIN")
        isAdmin = true;
    }
    return isAdmin;
  }

  get categories(): Category[] {
    return this._categories;
  }


}
