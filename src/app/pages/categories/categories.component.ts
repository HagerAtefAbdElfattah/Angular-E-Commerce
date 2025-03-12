import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/Category';
import { Router } from '@angular/router';
import { SubCategoriesComponent } from "../sub-categories/sub-categories.component";
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [SubCategoriesComponent, FormsModule, TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

    categoryList:Category[] = [];

    display:boolean = false

    catID:string='';
    
  constructor(private categoryService:CategoriesService, private router:Router) { }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(res)=>{
        this.categoryList = res.data;
      },error:(err)=>{
        console.log(err);
      }
    }
    );
  }

  goSubCategory(id:string){
    this.display = true
    this.catID = id
  }
}
