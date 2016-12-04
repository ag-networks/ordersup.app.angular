export enum OrganizationType {
  NGO,
  ForProfit
}

export class Organization {

  id:string;

  constructor(
    public name:string,
    public industry:string,
    public year_founded:string,
    public company_size:string,
    public number_of_locations:string,
    public email_address:string,
    public website:string,
    public address_line_1:string,
    public city:string,
    public state:string,
    public zipcode:string,
    public sub_industry?:string,
    public address_line_2?:string,
    public country?:string,
    public phone_number?:string,
    public fax_number?:string,
    public facebook_link?:string,
    public linkedin_link?:string,
    public twitter_link?:string,
    public instagram_link?:string,
    public snapchat_link?:string,
    public youtube_link?:string,
    public vimeo_link?:string,
    public pinterest_link?:string
    //private organization_type?:OrganizationType
  ) {

  }

  /*
  set organization_type(type:string) {
    console.log("Organization : setType()",type);
    this.type = OrganizationType[type];
  }
  */

}
