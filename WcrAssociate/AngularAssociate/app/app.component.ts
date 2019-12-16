import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Subscription, Observable, from, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'wcr-Associate-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    //constructor(private categoryService: CategoryService) { }

    ngOnInit() {

    }

}
