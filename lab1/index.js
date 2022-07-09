function wordPosition(words) {
    // INSERT YOUR CODE HERE
    let map = new Map();
    for (let index = 0; index < words.length; index++) {
        let key = words[index]
        let col
        if(map.has(key)){     
            col = map.get(key)
            col.push(index)
            map.set(key, col)
        }else{
            let col = new Array()
            col.push(index) 
            map.set(key, col)
        }
    }
    return map
}

var input = [
    "buy",
    "it",
    "use",
    "it",
    "break",
    "it",
    "fix",
    "it",
    "trash",
    "it",
    "change",
    "it",
    "mail",
    "upgrade",
    "it",
];

var output = wordPosition(input);
console.log(output);

/*
Output should look roughly similar to below (order does not matter):
{
    break: [ 4 ],
    buy: [ 0 ],
    change: [10],
    fix: [ 6 ],
    it:  [1, 3, 5, 7, 9, 11, 14],
    mail: [ 12 ],
    trash: [ 8 ],
    upgrade: [ 13 ],
    use: [ 2 ],
}

*/