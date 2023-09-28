import { TestBed } from '@angular/core/testing';
import { DateTimeFormatPipe } from './date-time-format.pipe';

describe('DateTimeFormatPipe', () => {
  let pipe: DateTimeFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeFormatPipe],
      providers: [DateTimeFormatPipe]
    });

    pipe = TestBed.inject(DateTimeFormatPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a valid date string to the expected format', () => {
    const inputDate = '2023-09-30T14:30:00'; 
    const formattedDate = pipe.transform(inputDate);

    expect(formattedDate).toEqual('Sat 30.09 14:30');
  });

  it('should transform a Date object to the expected format', () => {
    const inputDate = new Date('2023-09-30T14:30:00');
    const formattedDate = pipe.transform(inputDate);

    expect(formattedDate).toEqual('Sat 30.09 14:30');
  });

  it('should return "Impossible to convert date" for invalid input', () => {
    const invalidInput = 'invalidDate';
    const formattedDate = pipe.transform(invalidInput);

    expect(formattedDate).toEqual('Impossible to convert date');
  });

  it('should return "Impossible to convert date" for input with missing parts', () => {
    const incompleteInput = '2023-09-30T14'; 
    const formattedDate = pipe.transform(incompleteInput);

    expect(formattedDate).toEqual('Impossible to convert date');
  });

  it('should handle Date objects with missing parts', () => {
    const incompleteDate = new Date('2023-09-30T14'); 
    const formattedDate = pipe.transform(incompleteDate);

    expect(formattedDate).toEqual('Impossible to convert date');
  });
});
