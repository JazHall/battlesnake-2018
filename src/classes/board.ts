module battlesnake.Classes {

    import Point = battlesnake.Definitions.Point;

    export class Board {

        rows: Vertex[][];

        constructor(length: number) {
            this._constructBoard(length);
        }

        private _constructBoard(length: number): void {

            for (let i=0; i < length; i++) {
                this.rows[i] = [];
                for (let j=0; j < length; j++) {
                    let currPoint = {x: i, y: j};
                    let currCell = new Vertex("empty", null, currPoint);
                    this.rows[i][j] = currCell;
                }
            }
        }

        getBoardCell(point: Point): Vertex {
            //Check for valid board cell
            if (!this.validateCell(point)) {
                return null;
            }

            return this.rows[point.x][point.y];
        }

        setBoardCell(point: Point, cell: Vertex): void {
            //Check for valid board cell
            if (!this.validateCell(point)) {
                return null;
            }

            this.rows[point.x][point.y] = cell;
        }

        validateCell(point: Point): Boolean {
            if (!this.rows || !point) {
                return false;
            }
    
            if (point.x < 0 || point.x >= this.rows.length) {
                return false;
            }
    
            var column = this.rows[point.x];
    
            if (point.y < 0 || point.y >= column.length) {
                return false;
            }
    
            return true;
        }

        getAdjacentVertices(point: Point): Vertex[] {
            return [];
        }

        getConnectingEdge(vertex: Vertex, adjacentVertex: Vertex) {
            let connectingEdge;

            adjacentVertex.outEdges.forEach(edge => {
                if (edge.destination.x == vertex.point.x && edge.destination.y == vertex.point.y) {
                    connectingEdge = edge;
                }
            });
            
            return connectingEdge;
        }
    }

}