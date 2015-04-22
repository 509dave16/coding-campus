function sort(array)
{
    for(var staticIndex = 0; staticIndex < array.length - 1; staticIndex++)
    {
        var lowestNumber = array[staticIndex];
        var lowestNumberIndex = staticIndex;
        for(var movingIndex = staticIndex + 1; movingIndex < array.length; movingIndex++)
        {
            var number = array[movingIndex];
            if(number < lowestNumber)
            {
                lowestNumber = number;
                lowestNumberIndex = movingIndex;
            }
        }
        
        if(lowestNumberIndex !== staticIndex)
        {
            var tmpNumber = array[staticIndex];
            array[staticIndex] = array[lowestNumberIndex];
            array[lowestNumberIndex] = tmpNumber;
        }
    }
}

var array = [5,4,3,2,1];
sort(array);
console.log(array);