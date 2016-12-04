import { Concept } from './concept';
import { ConceptLocation } from './concept-location';
export class ConceptOwner {
  constructor(
    public id: number,
    public concept_id: number,
    public organization_name: string,
    public first_name: string,
    public last_name: string,
    public phone: string,
    public email: string,
    public concept?: Concept,
    public locations?: Array<ConceptLocation>,
    public menus?: Array<any>

  ) {  }
}
