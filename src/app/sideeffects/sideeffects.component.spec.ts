import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideeffectsComponent } from './sideeffects.component';

describe('SideeffectsComponent', () => {
  let component: SideeffectsComponent;
  let fixture: ComponentFixture<SideeffectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideeffectsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideeffectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
