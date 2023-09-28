import { TestBed } from '@angular/core/testing';
import { DateFormatPipe } from './date-format.pipe';

describe('DateFormatPipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateFormatPipe],
      providers: [DateFormatPipe]
    });

    pipe = TestBed.inject(DateFormatPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform a date string to "Today" if it matches the current date', () => {
    const currentDate = new Date();
    const formattedDate = pipe.transform(currentDate.toISOString());

    expect(formattedDate).toEqual('Today');
  });

  it('should transform a date string to "Tomorrow" if it matches the date of the next day', () => {
    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);

    const formattedDate = pipe.transform(nextDay.toISOString());

    expect(formattedDate).toEqual('Tomorrow');
  });

  it('should transform a date string to "dd.mm.yyyy" format if it is not "Today" or "Tomorrow"', () => {
    const inputDate = '2023-09-30T00:00:00Z';
    const formattedDate = pipe.transform(inputDate);

    expect(formattedDate).toEqual('30.09.2023');
  });

  it('should return "Impossible to convert date" for an invalid input', () => {
    const invalidInput = 'invalidDate';
    const formattedDate = pipe.transform(invalidInput);

    expect(formattedDate).toEqual('Impossible to convert date');
  });

  it('should handle Date objects as input', () => {
    const currentDate = new Date();
    const formattedDate = pipe.transform(currentDate);

    expect(formattedDate).toEqual('Today');
  });
});
