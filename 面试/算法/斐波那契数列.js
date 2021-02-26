function Fibonacci (n) {
    if ( n <= 1 ) {return 1};
    return Fibonacci(n - 1) + Fibonacci(n - 2);
  }

  Fibonacci(3)

// 1、1、2、3、5、8、13、21、34
// F(0) = 1
// F(1) = 1
// F(2) = 2