import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.dataService.getArticle(id).subscribe((data) => {
      this.article = data;
    });
  }
}
