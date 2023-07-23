import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Subscribe } from './subscribe.page';

describe('HomePage', () => {
  let component: Subscribe;
  let fixture: ComponentFixture<Subscribe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Subscribe],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Subscribe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
