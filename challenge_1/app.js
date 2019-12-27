var player = 'X';
var board =  [['', '', ''], ['', '', ''], ['', '', '']];
var embtyCells = 9;
var x = 0;
var o = 0;

var playerX = document.getElementById('x');
var playerO = document.getElementById('o');

var table = document.getElementById('table')
table.onclick = (event)=> {
  var container = event.path[1];
  var clickedElement = event.target;

  console.log(clickedElement.classList[0])

  if(board[container.id][clickedElement.classList[0]] === ''){
    board[container.id][clickedElement.classList[0]] = player;
    clickedElement.innerHTML = player;
    embtyCells--;
    clickedElement.classList.add(player.toLowerCase())


    var h = horizontallCon(container.id, clickedElement);
    var v = verticalCon(clickedElement)
    var d = diagonal(clickedElement)


    if(h || v || d) {
      player == 'X'? x++: o++;
      playerX.innerHTML = x.toString();
      playerO.innerHTML = o.toString();
      setTimeout(clear, 200)
      setTimeout(()=>alert(player + ' is winner'), 100)
    }else if(embtyCells == 0) {
      setTimeout(()=> clear(), 200)
      setTimeout(()=> alert('draw'), 100);
    }else player == 'X'? player = 'O': player = 'X';

  }else alert('choose another one')
}


document.getElementById('restart').onclick = ()=> {
  clear(true)
}


var horizontallCon = (containerId, clickedElement)=> {
  row = board[containerId]
  for(var i = 0; i < board.length; i++){
    if(row[i] !== clickedElement.innerHTML) {
      return false
    }
  }
  return true;
}

var verticalCon = (clickedElement)=> {
  for(var i = 0; i < board.length; i++) {
    // console.log(board[i], clickedElement.classList[0])
    if(board[i][clickedElement.classList[0]] !== clickedElement.innerHTML) {
      return false;
    }
  }
  return true;
}

var diagonal = (clickedElement)=> {
  var minor = true;
  var major = true;
  for(var i = 0; i < board.length; i++) {
    if(board[i][i] != clickedElement.innerHTML) {
      minor = false;
    }

    if(board[i][board.length - (i + 1)] != clickedElement.innerHTML) {
      major = false;
    }
  }
  if(minor || major) return true;
}

var clear = (restart = false) => {
  board =  [['', '', ''], ['', '', ''], ['', '', '']];
  embtyCells = 9;
  if(restart) {
    x = 0;
    o = 0;
    playerO.innerHTML = '0';
    playerX.innerHTML = '0';
    player = 'X';
  }


  for(var i = 0; i < 3; i++) {
    var classes = document.getElementsByClassName(i.toString())
    for(var j = 0; j < classes.length; j++) {
      classes[j].innerHTML = ''
      classes[j].classList.remove('x')
      classes[j].classList.remove('o')
    }
  }
}


