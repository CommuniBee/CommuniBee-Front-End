import { WeekdayNamesPipe } from './weekday-names.pipe';

describe('WeekdayNamesPipe', () => {
  it('create an instance', () => {
    const pipe = new WeekdayNamesPipe();
    expect(pipe).toBeTruthy();
  });
});
