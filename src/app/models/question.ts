import { Answer } from './answer';

export class Question {
  help: string;       // text of help
  answer: Answer[];   // Array of questions and subsequent questions
  label: string;      // Used to store question
  type: string;       // indicating type of question i.e radio, checkbox or text
  expanded: boolean;  // to indicate state of question open or closed
  value: string[];    // selected value
  show: boolean;      // value indicating whether question is shown - need to set to false when previous question is cleared
  depth: number;      // depth in tree - help with styling
}
