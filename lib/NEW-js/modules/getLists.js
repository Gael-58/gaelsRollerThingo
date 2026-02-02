async function getLists(listsInput, input){
    output = {};
    for (let list of input){
        output.push(await getData((await getData(listIndex))[list]["url"]));
    }
    return output;
}