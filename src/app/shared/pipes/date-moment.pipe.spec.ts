import { DateMomentPipe } from './date-moment.pipe';

describe('DateMomentPipe', () => {
  it('create an instance', () => {
    const pipe = new DateMomentPipe();
    expect(pipe).toBeTruthy();
  });
});
