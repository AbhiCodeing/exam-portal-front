import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any;

  quizData={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestion:'',
    active:true,
    category:{
      cId:'',
    },
  }

  constructor(private categoryService:CategoryService, private snack:MatSnackBar, private quizService:QuizServiceService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data:any)=>{
      this.categories=data;
    },(error)=>{
      console.log(error);
      Swal.fire('Error !!',"Error in loading data from server",'error')
      
    })
  }

  addQuiz()
  {
    if(this.quizData.title.trim()=='' || this.quizData.title==null)
    {
      this.snack.open("Title Requires !!",'',{duration:3000});
      return;
    }

    this.quizService.addQuiz(this.quizData).subscribe((data:any)=>{
      Swal.fire('Success !!',"Quiz is added",'success');
      this. quizData={
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestion:'',
        active:true,
        category:{
          cId:'',
        },
      }
    },(error)=>{
      Swal.fire('Error !!',"Error while adding quiz",'error');
      
    })
    
  }

}