import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalasComponent } from './sala.component';

describe('SalaComponent', () => {
  let component: SalasComponent;
  let fixture: ComponentFixture<SalasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
