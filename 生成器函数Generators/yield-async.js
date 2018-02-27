async function* createAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
      yield elem;
  }
}
const asyncIterable = createAsyncIterable(['a', 'b']);
const asyncIterator = asyncIterable[Symbol.asyncIterator]()

