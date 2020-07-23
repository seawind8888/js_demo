<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <h1>QuickSorter</h1>
    <button onclick="quickSort()">Quick Sort It!</button>
  </body>
  <script>
    var myArray = [8, 2, 5, 6];

    function quickSort(myArray) {
      if (myArray.length === 0) {
        return [];
      }

      var left = [];
      var right = [];
      var pivot = myArray[0];

      for (var i = 1; i < myArray.length; i++) {
        if (myArray[i] < pivot) {
          left.push(myArray[i]);
        } else {
          right.push(myArray[i]);
        }
      }

      return quickSort(left).concat(pivot, quickSort(right));
      document.getElementById().innerHTML = quickSort(left).concat(
        pivot,
        quickSort(right)
      );
    }
  </script>
</html>
