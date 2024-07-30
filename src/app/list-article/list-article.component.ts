import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: any[] = [];
  paginatedArticles: any[] = [];
  currentPage: number = 1;
  articlesPerPage: number = 9;
  totalPages: number = 0;

  constructor(private dataService: DataService) {}

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
