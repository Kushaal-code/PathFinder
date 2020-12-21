var tbl = document.createElement('table');
function createTable() {
    var bdy = document.getElementsByTagName('body')[0];
    tbl.style.width = '100%';
    tbl.style.height = '10% ';
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 30; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 30; j++) {
            var td = document.createElement('td');
            td.style.background = "white";
            td.appendChild(document.createTextNode(""));
            tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    bdy.appendChild(tbl);

}

//wall, start and end node
let start_row = 6;
let start_col = 6;
let end_row = 9;
let end_col = 9;

let selectStart = false;
let selectEnd = false;

createWall();


var j = 1;

//Start Visualize
function Start() {
    let choice = document.getElementById("algo").value;
    switch (choice) {
        case "0":
            console.log("dfs");
            pathFind(start_row, start_col, false);
            break;
        case "1":
            let prev = bfs(start_row, start_col);
            setTimeout(reconstructPath, j * 35, prev);
            break;
        case "2":
            let pre = dijkstra();
            setTimeout(rePath, j * 35, pre)
            break;
        case "3":
            ASearch().then((data)=>{
                setTimeout(aRePath,j*35, data);
            });
            
            break;
    }
}
//Reset Grid
function resetAll() {
    window.location.reload();
}
//Select start
function startNode() {
    selectStart = true;
    selectEnd = false;
    tbl.onclick = function (event) {
        if (selectStart && event.path[0].localName == "td") {
            tbl.rows[start_row].cells[start_col].style.background = "white";
            event.target.style.background = "yellow";
            start_col = event.target.cellIndex;
            start_row = event.path[1].rowIndex;
            selectStart = false;
        }
    }
}
//Select end
function endNode() {
    selectEnd = true;
    selectStart = false;
    tbl.onclick = function (event) {
        if (selectEnd && event.path[0].localName == "td") {
            tbl.rows[end_row].cells[end_col].style.background = "white";
            event.target.style.background = "red";
            end_col = event.target.cellIndex;
            end_row = event.path[1].rowIndex;
            selectEnd = false;
        }
    }
}
function createWall() {

    tbl.onmousedown = function (event) {
        if (!selectStart && !selectEnd && event.path[0].localName == "td")
            if (event.target.style.background == "white")
                event.target.style.background = "black";
            else if (event.target.style.background == "black")
                event.target.style.background = "white";
        function onMouseMove(event) {
            if (!selectStart && !selectEnd && event.path[0].localName == "td")
                event.target.style.background = "black";
        }
        document.addEventListener('mousemove', onMouseMove);
        tbl.onmouseup = function () {
            console.log("Mouseup");
            document.removeEventListener('mousemove', onMouseMove);
        }
    }
}
//Change Cell colors
function changeColor(x, y) {
    tbl.rows[x].cells[y].style.background = "green";
    tbl.rows[x].cells[y].style.transition = "1s";
    tbl.rows[x].cells[y].style.transitionDelay = j / (30) + "s";
}
function rchangeColor(x, y, color) {
    tbl.rows[x].cells[y].style.background = color + "";   
    //tbl.rows[x].cells[y].style.transition = "1s";
    tbl.rows[x].cells[y].style.transitionDelay = j/600 + "s"; 
}


//Queue DS
function Queue() {
    collection = [];
    this.print = function () { console.log(collection); }
    this.enqueue = function (element) { collection.push(element); }
    this.dequeue = function () { return collection.shift(); }
    this.front = function () { return collection[0]; }
    this.isEmpty = function () { return (collection.length == 0); }
}


//DFS
function pathFind(x, y, check) {
    j++;
    if (x < 0 || x > 29 || y > 29 || y < 0)
        return false;
    if (x == end_row && y == end_col) {
        tbl.rows[x].cells[y].style.background = "red";
        tbl.rows[x].cells[y].style.transition = "1s";
        tbl.rows[x].cells[y].style.transitionDelay = j / 50 + "s";
        return true;
    }

    if (tbl.rows[x].cells[y].style.background == "yellow" || tbl.rows[x].cells[y].style.background == "white") {
        changeColor(x, y)
        if (pathFind(x - 1, y, check)) {
            return true;
        }

        if (pathFind(x, y + 1, check)) {
            return true;
        }

        if (pathFind(x + 1, y, check)) {
            return true;
        }

        if (pathFind(x, y - 1, check)) {
            return true;
        }
    }
    return false;
}

//Cell class for BFS
function Cell(x, y, x2, y2) {
    this.cur = [x, y];
    this.pre = [x2, y2];
}

//Highlight the shortest path
function reconstructPath(prevlist) {
    var node = prevlist[prevlist.length - 1];
    var l = prevlist.length - 1;
    while (node.pre[0] != start_row || node.pre[1] != start_col) {
        console.log(node);
        rchangeColor(node.pre[0], node.pre[1], "yellow");
        while (prevlist[l].cur[0] != node.pre[0] || prevlist[l].cur[1] != node.pre[1]) {
            l--;
        }
        node = prevlist[l];
    }
}

//Dijkstra Path
function rePath(prevlist) {
    var node = prevlist[prevlist.length - 1];
    var l = prevlist.length - 1;
    while (node.pre.cur[0] != start_row || node.pre.cur[1] != start_col) {
        rchangeColor(node.pre.cur[0], node.pre.cur[1], "yellow");
        while (prevlist[l].cur[0] != node.pre.cur[0] || prevlist[l].cur[1] != node.pre.cur[1]) {
            l--;
        }
        node = prevlist[l];
    }
}
function aRePath(prevlist) {
    var node = prevlist[prevlist.length - 1];
    var l = prevlist.length - 1;
    console.log(node);
    while (node.prev.x != start_row || node.prev.y != start_col) {
        rchangeColor(node.prev.x, node.prev.y, "yellow");
        while (prevlist[l].x != node.prev.x || prevlist[l].y != node.prev.y) {
            l--;
        }
        node = prevlist[l];
    }
}
//BFS
function bfs(x, y) {
    let isVisited = new Queue();
    let prev = [];
    isVisited.enqueue([x, y]);
    var isfound = false;
    prev.push(new Cell(x, y, null, null));
    while (isfound == false) {
        var x = isVisited.front()[0];
        var y = isVisited.front()[1];
        if (x < 1) {
            x = 1;
        }
        if (x > 28) {
            x = 28;
        }
        if (y < 1) {
            y = 1;
        }
        if (y > 28) {
            y = 28;
        }
        if (isVisited.isEmpty()) {
            break;
        }
        if (tbl.rows[x].cells[y + 1].style.background == "white") {
            changeColor(x, y + 1);
            j++;
            isVisited.enqueue([x, y + 1]);
            var ncell = new Cell(x, y + 1, x, y);
            prev.push(ncell);
        }
        else if (tbl.rows[x].cells[y + 1].style.background == "red") {
            var ncell = new Cell(x, y + 1, x, y);
            prev.push(ncell);
            return prev;
        }
        if (tbl.rows[x + 1].cells[y].style.background == "white") {
            changeColor(x + 1, y);
            j++;
            isVisited.enqueue([x + 1, y]);
            var ncell = new Cell(x + 1, y, x, y);
            prev.push(ncell);
        }
        else if (tbl.rows[x + 1].cells[y].style.background == "red") {
            var ncell = new Cell(x + 1, y, x, y);
            prev.push(ncell);
            return prev;
        }
        if (tbl.rows[x - 1].cells[y].style.background == "white") {
            changeColor(x - 1, y);
            j++;
            isVisited.enqueue([x - 1, y]);
            var ncell = new Cell(x - 1, y, x, y);
            prev.push(ncell);

        }
        else if (tbl.rows[x - 1].cells[y].style.background == "red") {
            var ncell = new Cell(x + 1, y, x, y);
            prev.push(ncell);
            return prev;
        }
        if (tbl.rows[x].cells[y - 1].style.background == "white") {
            changeColor(x, y - 1);
            j++;
            isVisited.enqueue([x, y - 1]);
            var ncell = new Cell(x, y - 1, x, y);
            prev.push(ncell);
        }
        else if (tbl.rows[x].cells[y - 1].style.background == "red") {
            var ncell = new Cell(x + 1, y, x, y);
            prev.push(ncell);
            return prev;
        }
        isVisited.dequeue();
    }
}
//Dijkstra Nodes
function dnode(x, y, p) {
    this.cur = [x, y];
    this.pre = p;
    this.weight = (p != null) ? p.weight + 1 : 0;
    this.distance = Infinity;
    this.isVisited = false;
}
//PriorityQ
function PQ() {
    ar = [];
    function swap(a, b) {
        let temp = ar[a];
        ar[a] = ar[b];
        ar[b] = temp;
    }
    this.print = function () { console.log(ar); }
    this.enqueue = function (element, pre) {
        ar.push(element);
        let pos = ar.length - 1;
        while (pos > 0) {
            let parent = Math.floor((pos + 1) / 2) - 1;
            if (ar[parent].distance <= ar[pos].distance)
                break;
            swap(parent, pos);
            pos = parent;

        }
        pre.push(element)
    }
    function enqueue(element, pre) {
        console.log(element);
        ar.push(element);
        let pos = ar.length - 1;
        while (pos > 0) {
            let parent = Math.floor((pos + 1) / 2) - 1;
            if (ar[parent].distance <= ar[pos].distance)
                break;
            swap(parent, pos);
            pos = parent;

        }
        pre.push(element);
    }
    this.dequeue = function () {
        let toreturn = ar.shift();
        let pos = 0;
        while (pos < Math.floor(ar.length / 2)) {
            let left = 2 * pos + 1;
            let right = left + 1;
            if (right < ar.length && ar[left].distance > ar[right].distance) {
                if (ar[pos].distance <= ar[right].distance)
                    break;
                swap(pos, right);
                pos = right;
            } else {
                if (ar[pos].distance <= ar[left].distance)
                    break;
                swap(pos, left);
                pos = left;
            }
        }
        return toreturn;
    }
    this.front = function () { return ar[0]; }
    this.isEmpty = function () { return (ar.length == 0); }
    this.len = function () { return ar.length; }
    this.update = function (x, y, p, pre) {
        for (i = 0; i < ar.length; i++) {
            if (ar[i].cur[0] == x && ar[i].cur[1] == y) {
                let d = p.distance + ar[i].weight;
                if (d < ar[i].distance) {
                    let newNode = ar[i];
                    ar.splice(i);
                    newNode.distance = d;
                    newNode.pre = p;
                    enqueue(newNode, pre);
                }
            }
        }
    }
}

//Dijkstra
function dijkstra() {
    let nonVisited = new PQ();
    let path = [];
    let isfound = false;
    let start = new dnode(start_row, start_col, null);
    start.distance = 0;
    path.push(start);
    nonVisited.enqueue(start, path);
    while (true) {
        let curNode = nonVisited.dequeue(nonVisited.front().cur[0] + " , " + nonVisited.front().cur[1]);
        curNode.isVisited = true;
        let x = curNode.cur[0];
        let y = curNode.cur[1];
        if (x < 1) {
            x = 1;
        }
        if (x > 28) {
            x = 28;
        }
        if (y < 1) {
            y = 1;
        }
        if (y > 28) {
            y = 28;
        }
        // if(x!=start_row || y!=start_col)
        //     rchangeColor(x,y,"purple");
        if (tbl.rows[x].cells[y + 1].style.background == "white") {
            j++;
            changeColor(x, y + 1);
            let neighbor = new dnode(x, y + 1, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x].cells[y + 1].style.background == "green") {
            j++;
            nonVisited.update(x, y + 1, curNode, path);
        }
        else if (tbl.rows[x].cells[y + 1].style.background == "red") {
            let neighbor = new dnode(x, y + 1, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            path.push(neighbor);
            return path;
        }
        if (tbl.rows[x].cells[y - 1].style.background == "white") {
            j++
            changeColor(x, y - 1);
            let neighbor = new dnode(x, y - 1, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x].cells[y - 1].style.background == "green") {
            j++;
            nonVisited.update(x, y - 1, curNode, path);
        }
        else if (tbl.rows[x].cells[y - 1].style.background == "red") {
            let neighbor = new dnode(x, y - 1, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            path.push(neighbor);
            return path;
        }
        if (tbl.rows[x + 1].cells[y].style.background == "white") {
            j++;
            changeColor(x + 1, y);
            let neighbor = new dnode(x + 1, y, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x + 1].cells[y].style.background == "green") {
            j++;
            nonVisited.update(x + 1, y, curNode, path);
        }
        else if (tbl.rows[x + 1].cells[y].style.background == "red") {
            let neighbor = new dnode(x + 1, y, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            path.push(neighbor);
            return path;
        }
        if (tbl.rows[x - 1].cells[y].style.background == "white") {
            changeColor(x - 1, y);
            j++;
            let neighbor = new dnode(x - 1, y, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x - 1].cells[y].style.background == "green") {
            j++;
            nonVisited.update(x - 1, y, curNode, path);
        }
        else if (tbl.rows[x - 1].cells[y].style.background == "red") {
            let neighbor = new dnode(x - 1, y, curNode);
            neighbor.distance = Math.abs(neighbor.weight + curNode.distance);
            path.push(neighbor);
            return path;
        }

    }

}

// A* Search
function Anode(x, y, pre) {
    this.x=x;
    this.y=y;
    this.prev=pre;
    this.cost = (this.prev!=null)?pre.cost+1:0;
    this.hcost = Math.abs(x-end_row )+ Math.abs(y-end_col);
    this.gcost = this.cost+this.hcost;
    this.isVisited=false;
}

function APQ(){
    let ar = [];
    function swap(a, b) {
        let temp = ar[a];
        ar[a] = ar[b];
        ar[b] = temp;
    }
    this.enqueue = function (element, pre) {
        ar.push(element);
        let pos = ar.length - 1;
        while (pos > 0) {
            let parent = Math.floor((pos + 1) / 2) - 1;
            if (ar[parent].gcost <= ar[pos].gcost)
                break;
            swap(parent, pos);
            pos = parent;

        }
        pre.push(element)
    }
    this.dequeue = function () {
        let to_return = ar.shift();
        let pos = 0;
        while (pos < Math.floor(ar.length / 2)) {
            let left = 2 * pos + 1;
            let right = left + 1;
            if (right < ar.length && ar[left].gcost > ar[right].gcost) {
                if (ar[pos].gcost <= ar[right].gcost)
                    break;
                swap(pos, right);
                pos = right;
            } else {
                if (ar[pos].gcost <= ar[left].gcost)
                    break;
                swap(pos, left);
                pos = left;
            }
        }
        return to_return;
    }
    this.front = function () { return ar[0]; }
    this.isEmpty = function () { return (ar.length == 0); }
    this.len = function () { return ar.length; }
    this.print=function() { console.log(ar) };
    this.update = function (x, y, p, pre) {
        for (i = 0; i < ar.length; i++) {
            if (ar[i].x == x && ar[i].y == y) {
                let newNode = new Anode(x,y,p);
                if (ar[i].isVisited==false && newNode.gcost < ar[i].gcost) {
                    ar.splice(i);
                    this.enqueue(newNode, pre);
                }
            }
        }
    }
}


async function ASearch() {
    
    let nonVisited = new APQ();
    let path = [];
    let isfound = false;
    let start = new Anode(start_row, start_col, null);
    path.push(start);
    nonVisited.enqueue(start, path);
    while (true) {
        let curNode = nonVisited.dequeue();
        curNode.isVisited = true;
        let x = curNode.x;
        let y = curNode.y;
        if (x < 1) {
            x = 1;
        }
        if (x > 28) {
            x = 28;
        }
        if (y < 1) {
            y = 1;
        }
        if (y > 28) {
            y = 28;
        }
        if (tbl.rows[x].cells[y + 1].style.background == "white") {
            j++;
            changeColor(x, y + 1);
            let neighbor = new Anode(x, y + 1, curNode);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x].cells[y + 1].style.background == "green") {
            j++;
            nonVisited.update(x, y + 1, curNode, path);
        }
        else if (tbl.rows[x].cells[y + 1].style.background == "red") {
            let neighbor = new Anode(x, y + 1, curNode);
            path.push(neighbor);
            return path;
        }
        if (tbl.rows[x].cells[y - 1].style.background == "white") {
            j++
            changeColor(x, y - 1);
            let neighbor = new Anode(x, y - 1, curNode);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x].cells[y - 1].style.background == "green") {
            j++;
            nonVisited.update(x, y - 1, curNode, path);
        }
        else if (tbl.rows[x].cells[y - 1].style.background == "red") {
            let neighbor = new Anode(x, y - 1, curNode);
            path.push(neighbor);
            return path;
        }
        if (tbl.rows[x + 1].cells[y].style.background == "white") {
            j++;
            changeColor(x + 1, y);
            let neighbor = new Anode(x + 1, y, curNode);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x + 1].cells[y].style.background == "green") {
            j++;
            nonVisited.update(x + 1, y, curNode, path);
        }
        else if (tbl.rows[x + 1].cells[y].style.background == "red") {
            let neighbor = new Anode(x + 1, y, curNode);
            path.push(neighbor);
            return path;
        }
        if (tbl.rows[x - 1].cells[y].style.background == "white") {
            changeColor(x - 1, y);
            j++;
            let neighbor = new Anode(x - 1, y, curNode);
            nonVisited.enqueue(neighbor, path);
        }
        else if (tbl.rows[x - 1].cells[y].style.background == "green") {
            j++;
            nonVisited.update(x - 1, y, curNode, path);
        }
        else if (tbl.rows[x - 1].cells[y].style.background == "red") {
            let neighbor = new Anode(x - 1, y, curNode);
            path.push(neighbor);
            return path;
        }

    }

}
//a comment