import { Question } from './question'

export class Answer {
  label: string;
  type: string;
  help: string;
  question: Array<Question>;
  keywords: Array<String>;
  methods: Array<String>;
  value: string;
}
