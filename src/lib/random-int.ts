const UINT32_RANGE = 2 ** 32;

/**
 * 0 이상 maxExclusive 미만의 정수를 균등하게 뽑는다.
 * crypto.getRandomValues + 거절 샘플링으로 modulo bias를 없앤다.
 * crypto가 없는 환경에서는 Math.random으로 폴백한다.
 */
export function randomInt(maxExclusive: number): number {
  if (!Number.isInteger(maxExclusive) || maxExclusive < 1 || maxExclusive > UINT32_RANGE) {
    throw new RangeError(`randomInt: invalid maxExclusive ${maxExclusive}`);
  }

  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    // limit 이상 값은 버려야 각 나머지가 정확히 같은 개수만큼 나온다
    const limit = UINT32_RANGE - (UINT32_RANGE % maxExclusive);
    const buf = new Uint32Array(1);
    let value: number;
    do {
      crypto.getRandomValues(buf);
      value = buf[0];
    } while (value >= limit);
    return value % maxExclusive;
  }

  return Math.floor(Math.random() * maxExclusive);
}
