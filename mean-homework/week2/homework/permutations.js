/**
 *  This function will generate all the permuations for a unique set of Number elements
 * 
 * @param {Number[]} elements A Number Array
 * @return {Number[][]} A 2D Number Array
 */

function generatePermutations(elements)
{
    var permutations = [];
    if(elements.length === 1)
    {
        permutations.push(elements.slice(0));
        return permutations;
    }
    elements = elements.sort();
    permutations.push(elements.slice(0));
    var currentPlace = 1;
    while(currentPlace !== elements.length)
    {
        var placeOfNextHighestValue = findNextHighestPlace(currentPlace, elements);
        if(placeOfNextHighestValue === -1)
        {
            currentPlace++;
            continue;
        }
        var nextHighestValue = elements[placeOfNextHighestValue];
        var currentValue = elements[currentPlace];
        elements[currentPlace] = nextHighestValue;
        elements[placeOfNextHighestValue] = currentValue;
        
        if(currentPlace > 1)
        {
            var sortedElements = elements.splice(0,currentPlace);
            sortedElements = sortedElements.sort();
            elements = sortedElements.concat(elements);
            permutations.push(elements.slice(0));
            currentPlace = 1;
        }
        else
        {
            permutations.push(elements.slice(0));
        }
    }
    return permutations;
}

function findNextHighestPlace(place, elements)
{
    var max = -1;
    var maxIndex = -1;
    var placeValue = elements[place];
    for(var elementIndex = place; elementIndex > -1; elementIndex--)
    {
        var value = elements[elementIndex];
        if(value < placeValue && value > max)
        {
            max = value;
            maxIndex = elementIndex;
        }
    }
    return maxIndex;
}

/*var permutations = generatePermutations([0,1,2,3,4]);
console.log(permutations);
console.log(permutations.length);
*/

module.exports = generatePermutations;