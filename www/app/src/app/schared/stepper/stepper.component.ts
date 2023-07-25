import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent  implements OnInit {

  @Input() steps:number = 3;
  @Input() current:number = 1;
  @Output() stepEvent = new EventEmitter<number>();

  public tSteps:string[] = [];

  constructor() {}

  ngOnInit() {
    for(let i=0; i<this.steps; i++){
      let isActive = (this.current-1 === i ) ? 'active' : 'disabled';
      this.tSteps.push(isActive); 
    }
  }

  setStep(step:number){
    this.tSteps = this.tSteps.map((e, index)=>e= (step<index) ? "disabled" : 'active');
    this.tSteps[step] = 'active';
    this.current = step+1
    console.log(this.current);
    this.stepEvent.emit(this.current);
  }

}
