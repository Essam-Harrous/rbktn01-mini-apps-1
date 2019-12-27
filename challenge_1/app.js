var player = 'X';
var board =  [['', '', ''], ['', '', ''], ['', '', '']];
var embtyCells = 9;

var table = document.getElementById('table')
table.onclick = (event)=> {
  var container = event.path[1];
  var clickedElement = event.target;

  // console.log(event)

  if(board[container.id][clickedElement.className] === ''){
    board[container.id][clickedElement.className] = player;
    clickedElement.innerHTML = player;
    embtyCells--;


    var h = horizontallCon(container.id, clickedElement);
    var v = verticalCon(clickedElement)
    var d = diagonal(clickedElement)


    if(h || v || d) {
      alert(player + ' is winner')
      restart()
    }else if(embtyCells == 0) {
      alert('draw');
      restart()
    }
    player == 'X'? player = 'O': player = 'X';
  }else {
    alert('choose another one')
  }
}


document.getElementById('restart').onclick = ()=> {
  restart()
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
    // console.log(board[i], clickedElement.className)
    if(board[i][clickedElement.className] !== clickedElement.innerHTML) {
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

var restart = () => {
  board =  [['', '', ''], ['', '', ''], ['', '', '']];
  embtyCells = 9;

  for(var i = 0; i < 3; i++) {
    player = 'X'
    var classes = document.getElementsByClassName(i.toString())
    for(var j = 0; j < classes.length; j++) {
      classes[j].innerHTML = ''
    }
  }
}


