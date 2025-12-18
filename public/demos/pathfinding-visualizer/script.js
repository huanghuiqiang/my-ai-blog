const CONFIG = {
    cols: 30,
    rows: 15,
    delay: 20 // 动画延迟ms
};

let grid = [];
let startNode = { x: 4, y: 7 };
let endNode = { x: 25, y: 7 };
let isRunning = false;
let isMouseDown = false;

const gridEl = document.getElementById('grid');

// 初始化
function init() {
    gridEl.style.gridTemplateColumns = `repeat(${CONFIG.cols}, 1fr)`;
    renderGrid();
    setupEvents();
}

function createNode(x, y) {
    return {
        x, y,
        isWall: false,
        isStart: x === startNode.x && y === startNode.y,
        isEnd: x === endNode.x && y === endNode.y,
        g: Infinity,
        h: 0,
        f: Infinity,
        parent: null
    };
}

function renderGrid() {
    grid = [];
    gridEl.innerHTML = '';
    
    for(let y=0; y<CONFIG.rows; y++) {
        let row = [];
        for(let x=0; x<CONFIG.cols; x++) {
            const node = createNode(x, y);
            row.push(node);
            
            const el = document.createElement('div');
            el.className = 'grid-node';
            el.dataset.x = x;
            el.dataset.y = y;
            
            updateNodeClass(el, node);
            gridEl.appendChild(el);
            node.element = el; // 保存引用
        }
        grid.push(row);
    }
}

function updateNodeClass(el, node) {
    el.className = 'grid-node';
    if (node.isStart) el.classList.add('start');
    else if (node.isEnd) el.classList.add('end');
    else if (node.isWall) el.classList.add('wall');
}

function setupEvents() {
    gridEl.addEventListener('mousedown', e => {
        if(isRunning) return;
        isMouseDown = true;
        handleInput(e);
    });
    
    document.addEventListener('mouseup', () => isMouseDown = false);
    
    gridEl.addEventListener('mousemove', e => {
        if(isMouseDown && !isRunning) handleInput(e);
    });

    document.getElementById('startBtn').addEventListener('click', startPathfinding);
    document.getElementById('resetBtn').addEventListener('click', () => {
        if(isRunning) return;
        resetGrid();
    });
    document.getElementById('clearOpsBtn').addEventListener('click', () => {
        if(isRunning) return;
        clearPath();
    });
}

function handleInput(e) {
    const el = e.target;
    if(!el.classList.contains('grid-node')) return;
    
    const x = parseInt(el.dataset.x);
    const y = parseInt(el.dataset.y);
    const node = grid[y][x];

    if(!node.isStart && !node.isEnd) {
        node.isWall = !node.isWall;
        updateNodeClass(el, node);
    }
}

function getNeighbors(node) {
    const directions = [
        {x:0, y:-1}, {x:1, y:0}, {x:0, y:1}, {x:-1, y:0} // 上右下左
    ];
    const neighbors = [];
    
    for(let dir of directions) {
        const nx = node.x + dir.x;
        const ny = node.y + dir.y;
        
        if(nx >= 0 && nx < CONFIG.cols && ny >= 0 && ny < CONFIG.rows) {
            neighbors.push(grid[ny][nx]);
        }
    }
    return neighbors;
}

// 启发式函数 (曼哈顿距离)
function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function startPathfinding() {
    if(isRunning) return;
    isRunning = true;
    clearPath();
    
    const start = grid[startNode.y][startNode.x];
    const end = grid[endNode.y][endNode.x];
    
    let openSet = [start];
    let closedSet = new Set();
    
    start.g = 0;
    start.f = heuristic(start, end);
    
    // 主循环
    while(openSet.length > 0) {
        // 找到 f 值最小的节点
        let winner = 0;
        for(let i=1; i<openSet.length; i++) {
            if(openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        
        const current = openSet[winner];
        
        if(current === end) {
            await reconstructPath(current);
            isRunning = false;
            return;
        }
        
        // 从 OpenSet 移除
        openSet.splice(winner, 1);
        closedSet.add(current);
        
        // 可视化：标记为已访问 (排除起点终点)
        if(current !== start && current !== end) {
            current.element.classList.add('visited');
            await sleep(CONFIG.delay);
        }
        
        const neighbors = getNeighbors(current);
        
        for(let neighbor of neighbors) {
            if(closedSet.has(neighbor) || neighbor.isWall) continue;
            
            const tempG = current.g + 1;
            
            let newPath = false;
            if(openSet.includes(neighbor)) {
                if(tempG < neighbor.g) {
                    neighbor.g = tempG;
                    newPath = true;
                }
            } else {
                neighbor.g = tempG;
                newPath = true;
                openSet.push(neighbor);
            }
            
            if(newPath) {
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                neighbor.parent = current;
            }
        }
    }
    
    alert('无路径可达！');
    isRunning = false;
}

async function reconstructPath(current) {
    let temp = current;
    const path = [];
    while(temp.parent) {
        path.push(temp);
        temp = temp.parent;
    }
    
    // 反向遍历绘制
    for(let i = path.length - 1; i >= 0; i--) {
        const node = path[i];
        if(!node.isEnd) {
            node.element.classList.add('path');
            await sleep(30); // 路径绘制稍微快一点
        }
    }
}

function clearPath() {
    for(let row of grid) {
        for(let node of row) {
            // 清除数据
            node.g = Infinity;
            node.h = 0;
            node.f = Infinity;
            node.parent = null;
            // 清除 UI
            node.element.classList.remove('visited', 'path');
        }
    }
}

function resetGrid() {
    clearPath();
    for(let row of grid) {
        for(let node of row) {
            node.isWall = false;
            node.element.classList.remove('wall');
        }
    }
}

init();
