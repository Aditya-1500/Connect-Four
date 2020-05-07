var board = [[],[],[],[],[],[],[]]
var btn = $('button')
for (var i = 0; i < 7; i++) {
  var j = i;
  var col = []
  while(j<42){
    col = col.concat(btn.eq(j));
    j+=7;
  }
  board[i] = col;
}

var gray = board[1][1].css('background-color');
var gameOn = false;
while(!gameOn){
  var player_1 = prompt("Player 1, enter your name. You are Blue...");
  var player_2 = prompt("Player 2, enter your name. You are Red...");
  if (player_1==null || player_2==null) {
    gameOn = false;
  }else {
    gameOn = true;
  }
}
function getRowAvail(colno){
  var rowAvail = 5;
  while(rowAvail>=0){
    if (board[colno][rowAvail].css('background-color') === gray) {
        return rowAvail;
    }
    rowAvail--;
  }
  return rowAvail;
}

function getColor(rowno,colno) {
  return board[colno][rowno].css('background-color');
}

function checkHorizontal(rowno,currentColor){
  for (var i = 0; i < 4; i++) {
    if (getColor(rowno,i)==currentColor && getColor(rowno,i+1)==currentColor && getColor(rowno,i+2)==currentColor && getColor(rowno,i+3)==currentColor) {
        return true;
    }
  }
  return false;
}

function checkVertical(colno,currentColor) {
  for (var i = 0; i < 3; i++) {
    if (getColor(i,colno)==currentColor && getColor(i+1,colno)==currentColor && getColor(i+2,colno)==currentColor && getColor(i+3,colno)==currentColor) {
        return true;
    }
  }
  return false;
}

function checkDiagonal(){
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 3; j++) {
      if (getColor(j,i)==currentColor && getColor(j+1,i+1)==currentColor && getColor(j+2,i+2)==currentColor && getColor(j+3,i+3)==currentColor) {
        return true;
      }
    }
  }
  for (var i = 3; i < 7; i++) {
    for (var j = 0; j < 3; j++) {
      if (getColor(j,i)==currentColor && getColor(j+1,i-1)==currentColor && getColor(j+2,i-2)==currentColor && getColor(j+3,i-3)==currentColor) {
        return true;
      }
    }
  }
  return false;
}

function checkWin(rowno,colno,currentColor) {
  if(checkHorizontal(rowno,currentColor) || checkVertical(colno,currentColor) || checkDiagonal()){
    return true;
  }
  return false;
}

function isboardFull() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 6; j++) {
      if (board[i][j].css('background-color')==gray) {
        return false;
      }
    }
  }
  return true;
}

var player1Color = 'rgb(0, 0, 255)';
var player2Color = 'rgb(255, 0, 0)';
var turns = 1;
var currentColor = player1Color;
var gameEnd = false;
$('h3').text(player_1+" place your chip...");
$('button').on('click',function(){
  if (gameEnd==true) {
    alert("Game is Over. Please Refresh the brower to play again...");
    return;
  }
  var colno = $(this).closest("td").index();
  var rowno = getRowAvail(colno)
  if(rowno==-1){
    alert("This column is full already...\nChoose another one.");
    return;
  }
  board[colno][rowno].css('background-color',currentColor)
  if (isboardFull()) {
    alert("It's a draw!!!");
    return;
  }
//Create function for checkWin
  if(checkWin(rowno,colno,currentColor)){
    var winner;
    if(currentColor===player1Color){
      winner = player_1;
    }else {
      winner = player_2
    }
    alert('The game is over...'+winner+' has won the game!!')
    $('h3').text(winner+' has won the game...\nRefresh the browser to play again!!!');
    gameEnd = true;
    return;
  }
  if (turns%2==0) {
    $('h3').text(player_1+" place your chip...");
    currentColor = player1Color;
    turns++;
  }else {
    $('h3').text(player_2+" place your chip...");
    currentColor = player2Color;
    turns++;
  }
})
