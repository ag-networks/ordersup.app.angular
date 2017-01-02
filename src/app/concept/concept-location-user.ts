export class ConceptLocationUser {
  constructor(
    public id: number,
    public concept_location_id: number,
    public first_name: string,
    public last_name: string,
    public username: string,
    public pin: string,
    public email?: string,
    public phone?: string
  ) {  }
}
