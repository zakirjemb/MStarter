import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QiblafinderComponent } from './qiblafinder.component';

describe('QiblafinderComponent', () => {
  let component: QiblafinderComponent;
  let fixture: ComponentFixture<QiblafinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QiblafinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QiblafinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
