import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {

  @Input() steps: number = 3;
  @Input() current: number = 1;
  @Output() stepEvent = new EventEmitter<number>();

  public tSteps: string[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.steps; i++) {
      let isActive = (this.current - 1 === i) ? 'active' : 'disabled';
      this.tSteps.push(isActive);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    for (const current in changes) {
      const changedProp = changes[current];
      const to = changedProp.currentValue;
      if (!changedProp.isFirstChange()) {
        this.setStep(to - 1);
      }
    }
  }

  setStep(step: number) {
    const goTo = step + 1;
    if (goTo <= this.current) {
      this.tSteps = this.tSteps.map((e, index) => e = (step < index) ? "disabled" : 'active');
      this.tSteps[step] = 'active';
      this.current = goTo;
      console.log(this.current);
      this.stepEvent.emit(this.current);
    }
  }

}
