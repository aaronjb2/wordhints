module.exports = {
    async checkForBoard(req,res,next){
        let db = req.app.get('db');
        let {room} = req.params;
        let board = await db.get_board([room]);
        if (board.length===0){
            res.status(200).send(false);
        }else{
            res.status(200).send(true);
        }
    },
    async generateBoard(req,res,next){
        let db = req.app.get('db');
        let {room} = req.body;
        let boardArray = [];
        let numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
        let possibilitiesArray = [];
        for (let k = 0; k < 400; k++){
            possibilitiesArray.push(k+1);
        }
        let goesFirst = Math.floor(Math.random() * Math.floor(2));
        let numberOfBlue = goesFirst===1?9:8;
        let numberOfRed = goesFirst===1?8:9;
        let randomlySelectedIndex = -1;
        let blueArray = [];
        let redArray = [];
        for (let i = 0; i < numberOfBlue; i++){
            randomlySelectedIndex = Math.floor(Math.random() * Math.floor(numberArray.length));
            blueArray.push(numberArray[randomlySelectedIndex]);
            numberArray.splice(randomlySelectedIndex,1);
        }
        for (let j = 0; j < numberOfRed; j++){
            randomlySelectedIndex = Math.floor(Math.random() * Math.floor(numberArray.length));
            redArray.push(numberArray[randomlySelectedIndex]);
            numberArray.splice(randomlySelectedIndex,1);
        }
        randomlySelectedIndex = Math.floor(Math.random() * Math.floor(numberArray.length));
        let deathSpot = numberArray[randomlySelectedIndex];
        numberArray.splice(randomlySelectedIndex,1);
        blueArray = blueArray.sort((a,b)=>a-b);
        redArray = redArray.sort((a,b)=>a-b);
        let wordArray = [];
        randomlySelectedIndex = Math.floor(Math.random() * Math.floor(possibilitiesArray.length))
        let a = await db.get_all_words([]);
        for (let m = 0; m < 25; m++){
            wordArray.push(a[randomlySelectedIndex].word);
            possibilitiesArray.splice(randomlySelectedIndex,1);
            randomlySelectedIndex = Math.floor(Math.random() * Math.floor(possibilitiesArray.length));
        }
        for (let n = 0; n < 25; n++){
            if (numberArray[0]===n+1){
                boardArray.push({index:n+1,room,word:wordArray[n],guessed:false,color:'tan'});
                numberArray.splice(0,1);
            }
            if (blueArray[0]===n+1){
                boardArray.push({index:n+1,room,word:wordArray[n],guessed:false,color:'blue'});
                blueArray.splice(0,1);
            }
            if (redArray[0]===n+1){
                boardArray.push({index:n+1,room,word:wordArray[n],guessed:false,color:'red'});
                redArray.splice(0,1);
            }
            if (deathSpot===n+1){
                boardArray.push({index:n+1,room,word:wordArray[n],guessed:false,color:'black'});
            }
        }
        for (let o = 0; o < 25; o++){
            await db.create_board([boardArray[o].room,boardArray[o].word,boardArray[o].guessed,boardArray[o].color,boardArray[o].index]);
        }
        let c = await db.get_board([room]);
        c = c.sort((a,b)=>a.index-b.index);
        res.status(200).send({board:c,turn:goesFirst===1?"Blue HintGiver":"Red HintGiver",history:[],gameDone:false});
    },
    async getHistory(req,res,next){
        let db = req.app.get('db');
        let {room} = req.params;
        let board = await db.get_board([room]);
        board = board.sort((a,b)=>a.index-b.index);
        let history = await db.get_history([room]);
        let numberOfBlues = 0;
        board.forEach(element=>{if (element.color==='blue'){numberOfBlues++;}});
        let blueRemaining = board.findIndex(element=>element.color==='blue' && element.guessed===false);
        let redRemaining = board.findIndex(element=>element.color==='red' && element.guessed===false);
        let blackGuessed = board.findIndex(element=>element.color === 'black' && element.guessed===true);
        let turn = history.length===0 && numberOfBlues === 9?"Blue HintGiver":
        history.length===0 && numberOfBlues === 8?"Red HintGiver":
        history[history.length-1].color === 'blue' && history[history.length-1].hintgiver === false && !history[history.length-1].endofturn?"Blue Guesser":
        history[history.length-1].color === 'blue' && history[history.length-1].hintgiver === true?"Blue Guesser":
        history[history.length-1].color === 'red' && history[history.length-1].hintgiver === false && !history[history.length-1].endofturn?"Red Guesser":
        history[history.length-1].color === 'red' && history[history.length-1].hintgiver === true?"Red Guesser":
        history[history.length-1].color === 'blue' && history[history.length-1].hintgiver === false && history[history.length-1].endofturn?"Red HintGiver":
        "Blue HintGiver";
        res.status(200).send({board,history,gameDone:blueRemaining===-1 || redRemaining===-1 || blackGuessed!==-1?true:false,turn})
    },
    async addHistory(req,res,next){
        let db = req.app.get('db');
        let {room,color,hintgiver,word,number,correct,endofturn,voluntary_end} = req.body;
        await db.add_history([room,color,hintgiver,word,number,correct,endofturn,voluntary_end]);
        if (hintgiver === false && !voluntary_end){
            await db.guessed([room,word]);
        }
        let board = await db.get_board([room]);
        board = board.sort((a,b)=>a.index-b.index)
        let history = await db.get_history([room]);
        let blueRemaining = board.findIndex(element=>element.color==='blue' && element.guessed===false);
        let redRemaining = board.findIndex(element=>element.color==='red' && element.guessed===false);
        let turn = color === 'blue' && hintgiver === false && !endofturn?"Blue Guesser":
        color === 'blue' && hintgiver === true?"Blue Guesser":
        color === 'red' && hintgiver === false && !endofturn?"Red Guesser":
        color === 'red' && hintgiver === true?"Red Guesser":
        color === 'blue' && hintgiver === false && endofturn?"Red HintGiver":
        "Blue HintGiver";
        res.status(200).send({board,history,gameDone:blueRemaining===-1 || redRemaining===-1 || color==='black'?true:false,turn})
    }
}