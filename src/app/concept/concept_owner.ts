//import { ContentPostItem } from './content-post-item';
export class ConceptOwner {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public locations?: Array<any>,
    public owners?: Array<any>,
    public user?: any
  ) {  }
}
