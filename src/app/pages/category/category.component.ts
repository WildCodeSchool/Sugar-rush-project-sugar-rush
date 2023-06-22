import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CategoriesApiService } from 'src/app/services/categories-api.service';
import { Article } from 'src/app/shared/interfaces/article';
import { Category } from 'src/app/shared/interfaces/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {

  private _category!: any;
  private _articles!: Article[];
  arr = Array;

  constructor(private route: ActivatedRoute, private titleService: Title, public categoriesService: CategoriesApiService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this._category = params;
      this.titleService.setTitle('Sugar Rush : ' + params['name']);
    });
    this.categoriesService.getArticlesByCategorySlug(this.category.slug).subscribe((articles) => {
      this._articles = articles;
    }
    );
  };

  get category(): any {
    return this._category;
  }

  get articles(): Article[] {
    return this._articles;
  }
}
