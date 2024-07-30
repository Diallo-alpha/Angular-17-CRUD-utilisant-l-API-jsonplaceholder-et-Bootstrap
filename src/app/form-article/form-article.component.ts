import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-form-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form-article.component.html',
  styleUrl: './form-article.component.css'
})
export class FormArticleComponent {
  articleForm: FormGroup;
  articleId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      userId: [1]  // User ID statique pour cet exemple
    });
  }

  ngOnInit() {
    this.articleId = +this.route.snapshot.paramMap.get('id')!;
    if (this.articleId) {
      this.dataService.getArticle(this.articleId).subscribe((data) => {
        this.articleForm.patchValue(data);
      });
    }
  }

  onSubmit() {
    if (this.articleForm.valid) {
      if (this.articleId) {
        this.dataService.updateArticle(this.articleId, this.articleForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      } else {
        this.dataService.createArticle(this.articleForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      }
    }
  }

}
