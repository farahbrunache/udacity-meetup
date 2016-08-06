import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DATEPICKER_DIRECTIVES } from 'ng2-bootstrap';
import {
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'app-datepicker',
  templateUrl: 'datepicker.component.html',
  styleUrls: ['datepicker.component.css'],
  directives: [DATEPICKER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class DatepickerComponent implements OnInit {
  @Input() showDatepicker;
  @Input() field;
  @Input() id;
  @Input() control;
  @Input() dateModel;
  @Output() closed = new EventEmitter();
  @Output() selectionDone = new EventEmitter();
  @ViewChild('datepickerElement') datepickerElement;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    document.addEventListener("click", event => this.checkOutsideClicked(event) );
  }

  public hidePopup():void {
    this.showDatepicker = false;
    this.closed.emit(true);
  }

  public onDatepickerSelection(newDate):void {
    this.selectionDone.emit(newDate);
    this.hidePopup();
  }

  private checkOutsideClicked(event):void {
    if (event.target !== this.element.nativeElement.parentElement
      && !this.element.nativeElement.parentElement.contains(event.target)) {
      //console.log('doesnt look like an inside click... checking nullgbug');
      if (!this.nullGrandparentBug(event)) {
        this.hidePopup();
      }
		}
	}

  private nullGrandparentBug(event):boolean {
    // Some datepicker elements have a null grandparent
    // where there should be the `app-datepicker` element
    if (this.datepickerElement !== undefined) {
      let datepickerElement:any = this.element.nativeElement;
      let rec = datepickerElement.lastElementChild.getBoundingClientRect();
      if ((event.pageX >= rec.left && event.pageX <= rec.right) || (event.pageY <= rec.top && event.pageY >= rec.bottom)) {
        return true;
      }
    }
    return false;
  }

}
