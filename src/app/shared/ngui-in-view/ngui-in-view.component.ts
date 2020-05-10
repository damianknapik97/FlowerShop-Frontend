import {
  Component,
  OnInit,
  OnDestroy,
  ContentChild,
  TemplateRef,
  Input,
  Output,
  ElementRef,
  Renderer2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { EventEmitter } from 'events';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ngui-in-view',
  template: `
    <ng-container *ngIf="inView" [ngTemplateOutlet]="template"> </ng-container>
  `,
  styles: [':host {display: block;}'],
})
export class NguiInViewComponent implements OnInit, OnDestroy {
  observer: IntersectionObserver;
  inView = false;
  once50PctVisible = false;

  @ContentChild(TemplateRef, null) template: TemplateRef<any>;
  @Input() options: any = {
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
  };
  @Output('inView') inView$: EventEmitter<any> = new EventEmitter();
  @Output('notInView') notInView$: EventEmitter<any> = new EventEmitter();

  constructor(
    public element: ElementRef,
    public renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(
        this.handleIntersect.bind(this),
        this.options
      );
      this.observer.observe(this.element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  handleIntersect(entries, observer): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.inView = true;
        this.inView$.emit(entry);
      } else {
        this.notInView$.emit(entry);
      }
    });
  }
}
