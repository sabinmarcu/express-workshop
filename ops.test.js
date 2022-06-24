import { ops } from './ops.js';

describe('ops', () => {
  it('should be a function', () => {
    expect(ops).toBeInstanceOf(Function);
    expect(typeof ops).toBe('function');
  });
  it('should have two parameters', () => {
    expect(ops.length).toBe(2);
  });
  describe.each([
    {
      a: 1,
      b: 2,
      sum: 3,
      diff: -1,
      quot: 0.5,
      prod: 2,
      exp: 1,
    },
    {
      a: 0,
      b: 5,
      sum: 5,
      diff: -5,
      quot: 0,
      prod: 0,
      exp: 0,
    },
    {
      a: -5,
      b: 5,
      sum: 0,
      diff: -10,
      quot: -1,
      prod: -25,
      exp: (-5) ** 5,
    },
    // { a: '5', b: -5, error: true },
  ])('ops($a, $b)', ({
    a, b, error, ...rest
  }) => {
    if (error) {
      it('should error', () => {
        expect(() => ops(a, b)).toThrow();
      });
    } else {
      let output;
      beforeAll(() => {
        output = ops(a, b);
      });
      describe.each([
        'sum',
        'diff',
        'exp',
        'quot',
        'prod',
      ])('operations', (op) => {
        it(`${op} = ${rest[op]}`, () => {
          expect(output[op]).toBe(rest[op]);
        });
      });
    }
  });
});
