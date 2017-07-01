import { Question } from './question'

export class Answer {
  label: string;
  type: string;
  help: string;
  question: Question;
  keywords: string;
  methods: string;
}
