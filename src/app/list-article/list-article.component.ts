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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadArticles();
  }

  loadArticles() {
    this.dataService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  deleteArticle(id: number) {
    this.dataService.deleteArticle(id).subscribe(() => {
      this.articles = this.articles.filter((article) => article.id !== id);
    });
  }
}
