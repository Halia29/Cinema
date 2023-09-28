import { TestBed } from '@angular/core/testing';
import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  let pipe: TimeFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeFormatPipe],
      providers: [TimeFormatPipe]
    });

    pipe = TestBed.inject(TimeFormatPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a valid time string to the expected format', () => {
    const inputTime = '2001-01-01T14:30:00';
    const formattedTime = pipe.transform(inputTime);

    expect(formattedTime).toEqual('14:30');
  });

  it('should transform an empty string to an empty string', () => {
    const inputTime = '';
    const formattedTime = pipe.transform(inputTime);

    expect(formattedTime).toEqual('Impossible to convert date');
  });

  it('should handle invalid input and return a message', () => {
    const inputTime = 'invalidTime'; 
    const formattedTime = pipe.transform(inputTime);

    expect(formattedTime).toEqual('Impossible to convert date');
  });
});
