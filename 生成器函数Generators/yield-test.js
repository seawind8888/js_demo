function* countAppleSales(i=0) {
  while (i <= 5) {
    yield console.log(i)
    i++
  }
}
countAppleSales()