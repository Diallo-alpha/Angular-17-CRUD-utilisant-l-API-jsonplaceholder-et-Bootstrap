import { Routes } from '@angular/router';
import { ArticleListComponent } from './list-article/list-article.component';
import { ArticleDetailComponent } from './detail-article/detail-article.component';
import { FormArticleComponent } from './form-article/form-article.component';

export const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'create', component: FormArticleComponent },
  { path: 'edit/:id', component: FormArticleComponent },
];
