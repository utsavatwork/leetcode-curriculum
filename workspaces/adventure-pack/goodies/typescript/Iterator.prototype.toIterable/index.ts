import "../Function.returnThis/index.ts";
import { iteratorPrototype } from "../Iterator.prototype/index.ts";

declare global {
  interface Iterator<T> {
    toIterable(this: Iterator<T>): IterableIterator<T>;
  }
}

iteratorPrototype.toIterable = function <T>(
  this: Iterator<T>,
): IterableIterator<T> {
  (this as unknown as Record<symbol, unknown>)[Symbol.iterator] ??=
    Function.returnThis;
  return this as unknown as IterableIterator<T>;
};
