import { Inject, Injectable, Optional } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { geideaIcons } from '../icons/icons';



@Injectable({
  providedIn: 'root',
})
export class IconService {
  

  constructor(

    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer
  ) {}

  registerIcons(): void {
    const sets = [geideaIcons];
   

    for (const set of sets) {
      this.loadIcons(
        set.icons,
        `assets/images/icon-service`
      );
    }
  }

  private loadIcons(icons: Array<string>, path: string): void {
    icons.forEach((key: string) => {
      const svgIconKey = `${key}`;
      const svgPath = `${path}/${key}.svg`;

      this.matIconRegistry.addSvgIcon(
        svgIconKey,
        this.domSanitizer.bypassSecurityTrustResourceUrl(svgPath)
      );
    });
  }
}
