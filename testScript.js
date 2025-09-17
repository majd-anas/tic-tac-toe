// let board=[4,5,6,'x','x','x',7,8,9];
// let hrCombo=[[0,1,2],[3,4,5],[6,7,8]];

// function checkHr(row){
//     console.log(row);
//     let c=board[row[0]]+board[row[1]]+board[row[2]];
//     if(c=='xxx')
//         return true;
// }

// let result=hrCombo.some(checkHr);


const obj=function(){
    let objCounter=1;
    objCounter++;
}

obj.prototype.getObjCounter=function(){
    return this.objCounter;
}

let o2=new obj();
console.log(obj.getObjCounter());