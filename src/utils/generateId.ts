
export default function generateId(
  // @ts-ignore
  a = undefined                  // placeholder
): string {
  return a           // if the placeholder was passed, return
    ? (              // a random number from 0 to 15
      // @ts-ignore
      // eslint-disable-next-line
      a ^            // unless b is 8,
      Math.random()  // in which case
      * 16           // a random number from
      // @ts-ignore
      // eslint-disable-next-line
      >> a/4         // 8 to 11
    ).toString(16) // in hexadecimal
    : (              // or otherwise a concatenated string:
      // @ts-ignore
      [1e10] +
      // @ts-ignore
      1e10 +
      1e1
    ).replace(     // replacing
      /[01]/g,     // zeroes and ones with
      generateId // random hex digits
    ).toLowerCase()
}
