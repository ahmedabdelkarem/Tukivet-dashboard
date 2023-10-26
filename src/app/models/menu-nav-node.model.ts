


export class MenuNavNode {
  readonly routerLink: string;
  readonly name: string;
  constructor(
    readonly _name:  string,
    readonly icon: string,
    readonly navSegments: Array<string>,
    readonly children: Array<MenuNavNode>,
    public expanded = false,
    public isActive = false
  ) {
   
      this.name = _name;
    

    this.routerLink = `/${navSegments.join('/')}`;
  }
}
