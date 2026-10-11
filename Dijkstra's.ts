// Graph with vertex, edges along their edge weights
const graphDJ = new Map<string, Map<string, number>>()
// To store distance of each vertex from source node
const distance = new Map<string, number>()

// For setting order of process
// Infinity's are not added, only valid distances
const priorityQueue: { vertex: string, distance: number }[] = []
const SOURCE: string = 'A'

// Adding vertices
const addVertex = (

    vertex: string, edge: string,
    weight: number, bidirection: boolean = false

): void => {

    if (!graphDJ.has(vertex)) graphDJ.set(vertex, new Map())
    if (!graphDJ.has(edge)) graphDJ.set(edge, new Map())
    graphDJ.get(vertex)?.set(edge, weight)

    if (bidirection) graphDJ.get(edge)?.set(vertex, weight)

}

// Setting initial distances
const initialDistances = (): void => {

    graphDJ.forEach((edges, vertex) => {

        if (vertex === SOURCE) {

            distance.set(vertex, 0)
            priorityQueue.push({ vertex, distance: 0 })

        }
        else distance.set(vertex, Infinity)

    })

}

// Sort priority queue
const sortQueue = () => { priorityQueue.sort((a, b) => a?.distance - b?.distance) }

// Dijkstra's relax function
const relax = (source: string, destination: string, cost: number) => {

    const sourceDistance = distance.get(source)
    const destDistance = distance.get(destination)

    if (sourceDistance === undefined || destDistance === undefined ) return
    const newDistance: number = sourceDistance + cost
    if (newDistance < destDistance) {

        distance.set(destination, newDistance) // Updating distances
        // On updating the priority queue, if the vertex is already in the queue
        // then update it with new distance, else add the vertex and new entry
        let inQueu: number = priorityQueue.findIndex(data => data?.vertex === destination)
        if (inQueu != -1) priorityQueue[inQueu] = { vertex: destination, distance: newDistance }
        else priorityQueue.push({ vertex: destination, distance: newDistance })
        sortQueue() // Update the queu with new values

    }

}

// Main function
const dijkstra = () => {

    // Iterate until priority queue becomes empty
    while (priorityQueue.length != 0) {

        const data = priorityQueue.shift()
        if (!data) continue

        // visited.add( data?.vertex )
        const edges = graphDJ.get(data?.vertex)
        if (!edges) continue

        edges.forEach((weight, edge) => relax(data?.vertex, edge, weight))

    }

}

// Print final distances
const display = () => {

    distance.forEach((weight, vertex) => console.log(`${vertex}= ${weight}`))

}

addVertex('A', 'B', 2)
addVertex('A', 'C', 4)
addVertex('B', 'C', 1)
addVertex('B', 'D', 7)
addVertex('C', 'E', 3)
addVertex('D', 'E', 2)
addVertex('D', 'F', 1)
addVertex('E', 'F', 5)

initialDistances()
dijkstra()
display()