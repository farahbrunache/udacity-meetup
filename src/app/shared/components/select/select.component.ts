import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class SelectComponent implements OnInit {
  @Input() field;
  @Input() tabIndex;
  @Input() control;
  @Input() items;
  @Input() showFieldErrors;
  @Output() controlChange = new EventEmitter();
  @Output() placeAutocomplete = new EventEmitter();
  public ariaLabel:string = '';

  constructor() {}

  ngOnInit() {
  }

  public onInput(event):number {
    return event.target.value.length;
  }

}