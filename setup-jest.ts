import { getTestBed } from '@angular/core/testing';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

if (!getTestBed().platform) {
    setupZoneTestEnv();
}
