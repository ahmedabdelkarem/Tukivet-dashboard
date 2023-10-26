import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ga-extended-menu-nav-button',
  templateUrl: './extended-menu-nav-button.component.html',
})
export class ExtendedMenuNavButtonComponent {
  @Input() menuOpened?: boolean;
  @Output() readonly openMenu = new EventEmitter<undefined>();

  /* readonly TranslationCatalogues = TranslationCatalogues; */
  isRtl: boolean = false;
/* private readonly languageService: LanguageService */
  constructor() {
   /*  this.languageService.languageChange
      .pipe(untilDestroyed(this))
      .subscribe((language) => {
        this.isRtl = language.isRtl;
      }); */
  }

  onOpenMenuNav(): void {
    this.menuOpened = !this.menuOpened;
    this.openMenu.emit();
  }
}
