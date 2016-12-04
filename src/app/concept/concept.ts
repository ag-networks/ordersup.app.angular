export class Concept {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public locations?: Array<any>,
    public owners?: Array<any>,
    public user?: any,
    public menus?: Array<any>
  ) {  }
}
