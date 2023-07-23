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
  public actives:any = new Set();

  constructor() {

  }

  ngOnInit() {
    
    for(let i=0; i<this.steps; i++){
      let isActive = (this.current-1 == i ) ? 'active' : 'disabled';
      this.tSteps.push(isActive); 
    }
    this.actives.add(this.current);
    console.log(this.actives)

  }

  setStep(step:number){
    this.current = step
    this.actives.add(step);
    this.stepEvent.emit(this.current);
  }

}
