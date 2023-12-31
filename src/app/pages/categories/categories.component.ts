import { Component } from '@angular/core';
import { CategoriesApiService } from 'src/app/services/categories-api.service';
import { Category } from 'src/app/shared/interfaces/category';
import { APP_ROUTES } from 'src/app/shared/globals/routes';
import { ArticleDisplayed } from 'src/app/shared/interfaces/articleDisplayed';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  private _categories!: Category[];
  private _articles!: ArticleDisplayed[];
  public APP_ROUTES = APP_ROUTES;

  constructor(public categoriesService: CategoriesApiService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => {
        this._categories = categories;
      });
  }

  get categories(): Category[] {
    return this._categories;
  }

  get articles(): ArticleDisplayed[] {
    return this._articles;
  }

}
