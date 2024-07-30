import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../service/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  paginatedArticles: any[] = [];
  currentPage: number = 1;
  articlesPerPage: number = 9;
  totalPages: number = 0;
  articleForm: FormGroup;
  currentArticle: any = null;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.articleForm = this.fb.group({
      title: [''],
      body: [''],
      userId: [1],
    });
  }

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.dataService.getArticles().subscribe((data) => {
      this.articles = data;
      this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
      this.updatePaginatedArticles();
    });
  }

  openCreateModal() {
    this.currentArticle = null;
    this.articleForm.reset({ userId: 1 });
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  openEditModal(article: any) {
    this.currentArticle = article;
    this.articleForm.patchValue(article);
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('articleModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  saveArticle() {
    if (this.currentArticle) {
      this.updateArticle(this.currentArticle.id);
    } else {
      this.createArticle();
    }
  }

  createArticle() {
    this.dataService.createArticle(this.articleForm.value).subscribe((createdArticle) => {
      this.articles.unshift(createdArticle);
      this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
      this.updatePaginatedArticles();
      this.closeModal();
    });
  }

  updateArticle(id: number) {
    this.dataService.updateArticle(id, this.articleForm.value).subscribe((updated) => {
      const index = this.articles.findIndex((a) => a.id === id);
      if (index !== -1) {
        this.articles[index] = updated;
        this.updatePaginatedArticles();
        this.closeModal();
      }
    });
  }

  deleteArticle(id: number) {
    this.dataService.deleteArticle(id).subscribe(() => {
      this.articles = this.articles.filter((article) => article.id !== id);
      this.totalPages = Math.ceil(this.articles.length / this.articlesPerPage);
      this.updatePaginatedArticles();
    });
  }

  updatePaginatedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    this.paginatedArticles = this.articles.slice(startIndex, startIndex + this.articlesPerPage);
  }

  goToPage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedArticles();
    }
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
