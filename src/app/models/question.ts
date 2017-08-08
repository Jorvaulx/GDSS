import { Answer } from './answer';

export class Question {
  help: string;
  answer: Answer[];
  label: string;
  type: string;
  expanded: boolean;
  answered: boolean;
}
