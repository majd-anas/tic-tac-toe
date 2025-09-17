 const Player=function(marker,number){
    return{
        marker,number
    }
 }

 const GameBoard=(function(){
    let board=new Array(9).fill(0);

    const placeMarker=function(marker,index){
        if(board[index]==0){
            board.splice(index,1,marker);
            return true;
        }
        else
            return false;
    }

    return{
        board,
        placeMarker
    }

 })();

//module for gameLogic
const GameLogic=(function(){
    const player1=new Player("x",1);
    const player2=new Player("o",2);
    let currentPlayer=player1;
    let board=GameBoard.board;
    let gameWon=false;
    const hrCheck=function(marker){
        
        let hrCombo=[[0,1,2],[3,4,5],[6,7,8]];
        let win=marker+marker+marker;
        function checkHr(row){
            let c=board[row[0]]+board[row[1]]+board[row[2]];
            if(c==win)
                return true;
        }
        return hrCombo.some(checkHr);
    }

    const vrCheck=function(marker){
        
        let vrCombo=[[0,3,6],[1,4,7],[2,5,8]];
        let win=marker+marker+marker;
        function checkVr(col){
            let c=board[col[0]]+board[col[1]]+board[col[2]];
            if(c==win)
                return true;
        }
        return vrCombo.some(checkVr);
    }

    const diagCheck=function(marker){
        
        let diagCombo=[[0,4,8],[2,4,6]];
        let win=marker+marker+marker;
        function checkDiag(di){
            let c=board[di[0]]+board[di[1]]+board[di[2]];
            if(c==win)
                return true;
        }
        return diagCombo.some(checkDiag);
    }

    const checkWin=function(marker){
        return (diagCheck(marker)||vrCheck(marker)||hrCheck(marker));
    }

    const swapPlayer=function(){
        if(currentPlayer.number==1)
            currentPlayer=player2;
        else
            currentPlayer=player1;
    }

    const gameState=function(){
        return gameWon;
    }
    const playRound=function(index){
        if(GameBoard.placeMarker(currentPlayer.marker,index)){
            if(checkWin(currentPlayer.marker)){
                console.log(`${currentPlayer.marker} WINS`);
                gameWon=true;
                return;
            }
            if(board.every((element)=>element!=0)){
                console.log("TIE");
                return;
            }

            swapPlayer();

        }
    }
    return{
        playRound,
        gameState
    }

})();

//module for display

const DisplayControls=(function(){
    const cells=document.querySelectorAll(".cell");
    const board=GameBoard.board;
    const start=document.querySelector("#start");
    const choose=function(){
        
        cells.forEach((cell)=>{
            cell.addEventListener("click",()=>{
                if(!GameLogic.gameState()){
                    GameLogic.playRound(cell.dataset.index);
                    cell.textContent=board[cell.dataset.index];
                }
            });
        });
    }

    const startGame=function(){
        start.addEventListener("click",()=>{choose()
            console.log("start game clicked");
        });
    }

    return{
        startGame
    }
})();

DisplayControls.startGame();