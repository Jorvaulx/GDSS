import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Question} from "../models/question";
import {Answer} from "../models/answer";

@Injectable()
export class NavCommunicatorService {

  // Child Question - show
  private confirmNavigation = new Subject<boolean>();

  private clear = new Subject<boolean>();


  confirmNavigation$ = this.confirmNavigation.asObservable();
  clear$ = this.clear.asObservable();

  // Service Calls
  processClick(value: boolean) {
    this.confirmNavigation.next(value);
  }

  clearQuestion(value: boolean) {
    this.clear.next(value);
    console.log('clearQuestions:',value);
  }

  nextQuestion(questionList: Array<Question>): Question {
    let question: Question;
    var self = this;
    questionList.every(function (item: Question) {
      console.log('question item.value:', item.value, ' item.depth', item.depth);
      if (item.value === undefined || (item.value && !item.value.length)) {
        question = item;
        console.log('question found', question);
        return false;
      }
      if (item.answer) {
        jQuery.each(item.answer, function (index: number, answer: Answer) {
          console.log('answer answer.value:', answer.label);
          if (item.value && item.value.indexOf(answer.label) > -1) {
            console.log("answer match");
            if (answer.question && answer.question.length) {
              console.log('nextQuestion call:', answer.question);
              question = self.nextQuestion(answer.question);
              if (question) {
                return false;
              }
            }
          }
        });
        if (question) {
          return false;
        }
      }
      return true;
    });

    return question;
  }

  percentComplete(questionList: Array<Question>): number {
    var self = this;
    let questionCount: number = parseInt($("#completeCount").val().toString());
    let toBeCompleted: number = questionCount;

    jQuery.each(questionList, function (index: number, question: Question) {
      let value: Array<string> = question.value ? question.value : new Array<string>();
      // Handle first level
      if (!question.depth && value.length) {
        toBeCompleted--;
      }
      jQuery.each(question.answer, function (index: number, answer: Answer) {
        toBeCompleted -= self.determineChildQuestionsLeft(answer.question, value);
      });
    });
    if (!toBeCompleted)
      return 0;
    return Math.round(toBeCompleted / questionCount * 100);
  }

  determineChildQuestionsLeft(questionList: Array<Question>, answers: Array<string>): number {
    var self = this;
    let questionsCompleted: number = 0;
    $.each(questionList, function (index: number, question: Question) {
      // Check if in current line
      let currentQuestionLine: boolean = answers.indexOf(question.label) > -1;
      // Remove questions not relevant to current question line
      if (!currentQuestionLine) {
        questionsCompleted++;
      } else if (question.value && question.value.length) {
        // answer matching question.value
        questionsCompleted++;
      }
      $.each(question.answer, function (index: number, answer: Answer) {
        if (answer.question && answer.question.length) {
          questionsCompleted += self.determineChildQuestionsLeft(answer.question, question.value);
        }
      });
    });
    return questionsCompleted;
  }


}
