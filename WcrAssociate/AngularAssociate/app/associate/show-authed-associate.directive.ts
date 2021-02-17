import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';

import { UserService } from '../../app/services/auth';

@Directive({ selector: '[appShowAuthedAssociate]' })
export class ShowAuthedAssociateDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private userService: UserService,
        private viewContainer: ViewContainerRef
    ) { }

    condition: boolean;

    ngOnInit()
    {
        //this.userService.isAuthenticatedAssociate.subscribe(
        //    (isAuthenticated) => {
        //        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
        //            this.viewContainer.createEmbeddedView(this.templateRef);
        //        } else {
        //            this.viewContainer.clear();
        //        }
        //    }
        //);
    }

    @Input() set appShowAuthedAssociate(condition: boolean)
    {
        this.condition = condition;
    }

}
