function StringOperations()
{
    this.reverse = function (string)
    {
        if(string.length > 1)
        {
            var frontIndex = 0;
            var backIndex = string.length -1;
            var frontChar = '';
            var backChar = '';
            var charArray = [];
            
            while(frontIndex < backIndex)
            {
                frontChar = string[frontIndex];
                backChar = string[backIndex];
                charArray[frontIndex] = backChar;
                charArray[backIndex] = frontChar;
                frontIndex++;
                backIndex--;
            }
            
            if(string.length % 2 !== 0)
            {
                charArray[frontIndex] = string[frontIndex];
            }
            
            return charArray.join("");
        }
        else
        {
            return string;
        }
    };
    
    this.removeConsecutiveDuplicates = function (string)
    {
        var lastUniqueChar = "";
        var charArray = [];
        for(var charIndex = 0; charIndex < string.length; charIndex++)
        {
            var char = string[charIndex];
            if( lastUniqueChar !== char )
            {
                lastUniqueChar = char;
                charArray.push(char);
            }
        }
        return charArray.join("");
    };
    
    this.removeLowercaseLetters = function(string)
    {
       var charArray = [];
       for(var charIndex = 0; charIndex < string.length; charIndex++)
       {
           var charCode = string.charCodeAt(charIndex);
           if( charCode < 97 || charCode > 122 )
           {
               charArray.push(String.fromCharCode(charCode));
           }
       }
       return charArray.join("");
    };
    
    this.isPalindrome = function(string)
    {
        var stringWithoutSpaces = string.replace( " ", "" );
        var reversedString = this.reverse(stringWithoutSpaces);
        if(stringWithoutSpaces === reversedString)
        {
            return true;
        }
        return false;
    };
}

module.exports = exports =  new StringOperations();


