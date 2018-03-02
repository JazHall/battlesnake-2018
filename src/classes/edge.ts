/*
*   Edge {
*        direction:     'up' | 'left' | 'down' | 'right',
*        weight:        Integer,
*        source:        Point | null,
*        destination:   Point | null
*   }
*/

import Move = battlesnake.Definitions.Move;
import Point = battlesnake.Definitions.Point;
import Board = battlesnake.Classes.Board;

module battlesnake.Classes {
	export class Edge {

		direction: Move = "up";
		weight: number = 100;
		source: Point;
		destination: Point;

		constructor(direction: Move, source: Point, destination?: Point) {
			//Initialize properties, if supplied
			if (direction) {
				this.direction = direction;
			}
			if (source) {
				this.source = source;
			}
			if (destination) {
				this.destination = destination;
			}
		}

		compareTo(other: Edge): number {
			if (this.weight < other.weight) {
				return -1;
			}
			if (this.weight > other.weight) {
				return 1;
			}
			return 0;
		}
	}
}