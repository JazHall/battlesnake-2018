export function floodFill(vertex, depth): void {
    // Increment depth
    depth++;
    // Mark vertex as visited
    vertex.visited = true;

    // If no children
    if (vertex.outEdges.length === 0) {
        // Reset visisted property so other paths can reach this vertex
        vertex.visited = false;
        // Return depth
        return depth;
    }

    // For every node adjacent to our head
    vertex.outEdges.forEach((edge: Edge) => {
        // This vertex has already been visited
        if (edge.destination.visited) {
            return;
        }
        // Depth first search for max subtree height
        vertex.maxSubtreeHeight = Math.max(vertex.maxSubtreeHeight, floodFill(edge.destination, depth));
    });

    // Mark vertex as unvisited
    vertex.visited = false;
    return vertex.maxSubtreeHeight;
}
