import { Directive, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Directive()
export abstract class LeaveCycleManager implements OnDestroy{
    $destroy = new Subject<void>();
    
    ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
    }
}
