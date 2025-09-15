
function Player(marker,number){
    
    return{
        marker,number
    }
}

const GameBoard=(function(){

    const board=new Array(10).fill(0);

    const placeMarker=function(marker,index){
        board.splice(index,1,marker);
    } 

    const getBoard=function(){
        return board;
    }

    return{placeMarker,getBoard};

})();


const GameLogic=(function(){

    let board=GameBoard.getBoard();

    function makePlay(player){
        let index=parseInt(prompt(`player ${player.number} place your mark`),10);
        if(board[index]!=0)
            while(board[index]!=0)
                index=parseInt(prompt(`player ${player.number} place your mark again position was already taken`),10);
            
        
        GameBoard.placeMarker(player.marker,index);
        return index;
    }

    function checkMarkers(winMarkers,playerMarkers){
        if(winMarkers==playerMarkers)
            return true;
        else 
            return false;
    }

    function checkHorizontal(player,index){

        const marker=player.marker;
        let win=marker+marker+marker;
        let hr;
        if(index%2==0||index==5){
            let hr=board[index-1]+marker+board[index+1];
            return checkMarkers(win,hr);
        }
        else{

            if(index%3==0)
                hr=board[index-1]+marker+board[index-2];
            
            else
                hr=board[index+1]+marker+board[index+2];

            return checkMarkers(win,hr)
            
        }

    }
    

    function checkVertical(player,index){
        const marker=player.marker;
        let win=marker+marker+marker;
        let hr;
        
        if(index%2==0||index==5){
            let hr=board[index-3]+marker+board[index+3];
            return checkMarkers(win,hr);
        }
        else{

            if(index%3>1)
                hr=board[index-3]+marker+board[index-6];
            
            else
                hr=board[index+3]+marker+board[index+6];

            return checkMarkers(win,hr)
            
        }

    }


    function checkDiag(player,index){

        if(index%2!=0){
            const marker=player.marker;
            let win=marker+marker+marker;
            let di1,di2;
            
            if(index==5){
                di1=board[index-2]+marker+board[index+2];
                di2=board[index-4]+marker+board[index+4];
                if(checkMarkers(win,di1))
                    return checkMarkers(win,di1);
                else 
                    return checkMarkers(win,di2);
            }
            else{
                hr=board[index+(5-index)]+marker+board[index+(5-index)];
                return checkMarkers(win,hr)
            }
        }
        else
            return false;
    }

    function winCheck(player,index){
        if(checkHorizontal(player,index)||checkVertical(player,index)||checkDiag(player,index))
            return true;
        else
             return false;
    }

    return{
        makePlay,winCheck
    };

})();

const runGame=function(){
    let turns=9;
    let index;
    const player1=Player("x",1);
    const player2=Player("o",2);
    let winner=false;
    while(turns){

        if(turns%2!=0){
            index=GameLogic.makePlay(player1);
            if(GameLogic.winCheck(player1,index)){
                winner=player1.number;
                console.log(GameBoard.getBoard());
                DisplayControls.cellContent();
                break;
            }
        }
        else{

            index=GameLogic.makePlay(player2);
            if(GameLogic.winCheck(player2,index)){
                winner=player2.number;
                console.log(GameBoard.getBoard());
                DisplayControls.cellContent();
                break;
            }
        }


        turns--;
    }

    console.log(winner);

}

const DisplayControls=(function(){
    const cells=document.querySelectorAll(".cell");
    const board=GameBoard.getBoard();
    const cellContent=function(){cells.forEach((cell)=>{
        if(board[cell.dataset.index]!=0)
            cell.textContent=board[cell.dataset.index];
        else
            cell.textContent="";
    })}
    
    const cellClicked=function(){
        cells.forEach((cell)=>{
            cell.addEventListener("click",(e)=>{
                    e.target.dataset.index;
                    console.log(e.target.dataset.index);
                })
        });
    }
    return{
        cellContent,cellClicked
    }


})();

runGame();