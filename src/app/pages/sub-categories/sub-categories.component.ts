import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SubCategoriesService } from '../../core/services/sub-categories.service';
import { SubCategory } from '../../core/interfaces/sub-category';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/Category';

@Component({
  selector: 'app-sub-categories',
  imports: [],
  templateUrl: './sub-categories.component.html',
  styleUrl: './sub-categories.component.scss'
})
export class SubCategoriesComponent implements OnChanges {

  constructor(private SubCategories:SubCategoriesService,private cat:CategoriesService) { }

  @Input() id: string=''

  categoryID :string='';

  showCat!:Category 

  subCatOnCategoryList: SubCategory[] = []

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'] && this.id) {
      this.categoryID = this.id;
      this.subCategoryOnCategory(this.categoryID);
      this.getSpecificCategory(this.categoryID);
    }
  }

  subCategoryOnCategory(categoryID :string){
    this.SubCategories.SubCategoryOnCategory(categoryID).subscribe({
      next:(res)=>{  
        console.log(res);
        
        this.subCatOnCategoryList = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  getSpecificCategory(categoryID :string){
    this.cat.getSpecificCategory(categoryID).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.showCat = res.data
      },error:(err)=>{
        console.log(err);
      }
    })
  }
}
