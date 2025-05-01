import { TestBed } from '@angular/core/testing';

import { MDeviceService } from './m-device.service';

describe('MDeviceService', () => {
  let service: MDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
