/*
*   Vertex {
*        state:     'head'|'body'|'food'|'empty'
*        snake:     'you'|'enemy'
*        distance:  Infinity | 0,
*        visited:   false
*        outEdges:  [Edges]
*        parent:    null | Point
*        coords:    Point
*        isShortestPathOrigin:  true | false
*        maxSubtreeHeight:  Integer
*   }
*/

module battlesnake.Classes {
    import State = battlesnake.Definitions.State;
    import SnakeType = battlesnake.Definitions.SnakeType;
    import Point = battlesnake.Definitions.Point;

    export class Vertex {

        state: State = "empty";
        snake: SnakeType = "enemy";
        distance: number = Infinity; //Fundamental to Dijkstra's. The weight of the shortest path (in terms of distance, not moves)
        maxSubtreeHeight: number = 0;
        visited: Boolean = false; //Allows us to eliminate vertices pulled from priority queue instead of linear time to remove
        isShortestPathOrigin: Boolean = false;
        parent: Vertex; //When we have lightest food, work backwards through parent to find path
        point: Point; //Store the coordinates so we can later check if vertex is visited in constant time
        adjacentCells: Edge[];
        outEdges: Edge[];

        constructor(state: State, snake: SnakeType, point: Point) {
            //Initialize properties, if supplied
            if (state) {
                this.state = state;
            }
            if (snake) {
                this.snake = snake;
            }
            if (point) {
                this.point = point;
            }

            //This is the head of our snake
            if (this.state === "head" && this.snake == "self") {
                //Use this as the shortest path source
                this.distance = 0;
                this.isShortestPathOrigin = true;
            }

            //Establish adjacent cells
            let currX: number = this.point.x;
            let currY: number = this.point.y; //tasty

            let leftCell: Point = { x: currX - 1, y: currY };
            let rightCell: Point = { x: currX + 1, y: currY };
            let upCell: Point = { x: currX, y: currY - 1 };
            let downCell: Point = { x: currX, y: currY + 1 };

            this.adjacentCells.push(new Edge("left", leftCell));
            this.adjacentCells.push(new Edge("right", rightCell));
            this.adjacentCells.push(new Edge("up", upCell));
            this.adjacentCells.push(new Edge("down", downCell));
        }

        compareTo(other: Vertex): number {
            if (this.distance < other.distance) {
                return -1;
            }
            if (this.distance > other.distance) {
                return 1;
            }

            return 0;
        }

        containsSnake(board: Board, point: Point, allowOwnHead?: Boolean): Boolean {
            allowOwnHead = allowOwnHead || false;

            var cell = board.getBoardCell(point);

            if (!cell) {
                return false;
            }

            // Cell contains the head or body of a snake
            if (/head|body/.test(cell.state)) {
                // Allow connection with our own head
                if (allowOwnHead && cell.snake === "self") {
                    return false;
                }
                return true;
            }

            return false;
        }
        addEdges(board): void {
            // Filter out off-the-board vertices
            this.adjacentCells.filter(cell => board.validCell(board, cell.source))
                // Filter out vertices contains a snake
                .filter(cell => !this.containsSnake(board, cell.source))
                // Edge is safe, add it to the outedges of this vertex
                .forEach(cell => this.outEdges.push(new Edge(cell.direction, this.point, cell.source)));
        }
    }
}

