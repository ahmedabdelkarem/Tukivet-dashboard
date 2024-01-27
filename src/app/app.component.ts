import { Component } from '@angular/core';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map } from 'rxjs';
import { MenuNavNode } from './models/menu-nav-node.model';
import { IconService } from './shared/service/icon.service';
import { BreakpointService } from './shared/service/breakpoint/breakpoint.service';
@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  hideHeader = true;
  readonly currentPage$ = new BehaviorSubject<string | undefined>('');
  menuNodes = [new MenuNavNode(
    'الرئيسية',
    'dashboard',
    ['', ''],
    [],

  ),
  new MenuNavNode(
    'طلبات مقدمي الخدمات',
    'organizations',
    ['', '/'],
    [],

  ),
  new MenuNavNode(
    'المستخدمين',
    'tools',
    ['', 'users'],
    [],

  ),
  new MenuNavNode(
    'الاطباء',
    'templates',
    ['', 'doctors'],
    [],

  )
    ,
  new MenuNavNode(
    'مقدمي الرعايه البيطرية',
    'templates',
    ['', 'veterinary-care'],
    [],

  )

  ]
  isSmwidth!: boolean;
  constructor(private readonly router: Router, private readonly iconService: IconService, private breakpointService: BreakpointService, private activatedRoute: ActivatedRoute) {
    this.initRouterEvents();
    this.breakpointService.isMobile$.pipe(untilDestroyed(this))
      .subscribe((isSmWidth: boolean) => {
        this.isSmwidth = isSmWidth;
      });
    // Load custom icons
    this.iconService.registerIcons();
  }

  private readonly isNavigationEnd = (event: Event): event is NavigationEnd =>
    event instanceof NavigationEnd;
  private initRouterEvents(): void {
    this.router.events
      .pipe(
        filter(this.isNavigationEnd),
        map((event) => (event.url || '')),
        untilDestroyed(this)
      )
      .subscribe((currentPage: string | any) => {

        if (currentPage.includes('auth')) {
          this.hideHeader = true;
        } else {
          this.hideHeader = false;
        }
        if (currentPage.includes('policy')) {
          this.hideHeader = true;
        } else {
          this.hideHeader = false;
        }
        this.currentPage$.next(currentPage);
      });
  }
}
