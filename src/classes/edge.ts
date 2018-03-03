/*
*   Edge {
*        direction:     'up' | 'left' | 'down' | 'right',
*        weight:        Integer,
*        origin:        Vertex | null,
*        destination:   Vertex | null
*   }
*/

import Move = battlesnake.Definitions.Move;
import Vertex = battlesnake.Definitions.Vertex;
import Board = battlesnake.Classes.Board;

module battlesnake.Classes {
	export class Edge {

		direction: Move = "up";
		weight: number = 100;
		origin: Vertex;
		destination: Vertex;

		constructor(direction: Move, origin: Vertex, destination?: Vertex) {
			//Initialize properties, if supplied
			if (direction) {
				this.direction = direction;
			}
			if (origin) {
				this.origin = origin;
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