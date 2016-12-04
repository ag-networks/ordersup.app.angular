//import { ContentPostItem } from './content-post-item';
export class ConceptLocation {
  constructor(
    public id: number,
    public concept_id: number,
    public owner_id: number,
    public name: string,
    public store_code: string,
    public address1: string,
    public address2: string,
    public city: string,
    public state: string,
    public zipcode: string,
    public users?: Array<any>,
    public menu?: any,
    public owner?: any,
    public menus?: Array<any>
  ) {  }
}
