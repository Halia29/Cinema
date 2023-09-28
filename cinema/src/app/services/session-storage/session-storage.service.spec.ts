import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get values from sessionStorage', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };
    service.set(key, value);
    const retrievedValue = service.get(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should return null for a non-existent key', () => {
    const nonExistentKey = 'nonExistentKey';
    const retrievedValue = service.get(nonExistentKey);
    expect(retrievedValue).toBeNull();
  });

  it('should remove a value from sessionStorage', () => {
    const keyToRemove = 'keyToRemove';
    const valueToRemove = { data: 'valueToRemove' };
    service.set(keyToRemove, valueToRemove);
    service.remove(keyToRemove);
    const retrievedValue = service.get(keyToRemove);
    expect(retrievedValue).toBeNull();
  });
});
