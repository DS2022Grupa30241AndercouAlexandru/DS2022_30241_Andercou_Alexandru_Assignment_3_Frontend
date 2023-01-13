import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appChatDirective]'
})
export class ChatDirectiveDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
