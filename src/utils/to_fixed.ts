// eslint-disable-next-line import-x/no-unassigned-import
import 'tofixed-round-fix';

// Added current toFixed to since in javascript
// toFixed-function, the floating point number 5
// does not belong to the upper half of an integer,
// the given number is rounded down
const toFixed = (num: number, scale: number): string => {
  return num.toFixed(scale);
};

export default toFixed;
