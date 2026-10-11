const Greedy = new Map< string, Set< string > >()
const path: string[] = []
const visit: Set< string > = new Set()
const heuristic = new Map< string, number >()

const hValues: number[] = [ 10, 8, 7, 5, 3, 0 ]
const GOAL = 'G'

// Adding each element to graph
const addV = ( vertex: string ): void => {

    if( !Greedy.has( vertex ) ) Greedy.set( vertex, new Set() )

}

// Creating graph
const createGraph = ( vertex: string, edge: string, bidirectional: boolean = false ): void => {

    // Adding vertex and it edge to graph
    addV( vertex )
    Greedy.get( vertex )?.add( edge )

    // If they has bidirectional connection then add them back
    if( bidirectional ) {

        addV( edge )
        Greedy.get( edge )?.add( vertex )

    }

}

// Setting heuristic value
const createHeuristic = (): void => {

    let i = 0
    for( const vertex of Greedy.keys() ) {

        heuristic.set( vertex, hValues[i] )
        i++

    }

}

// Greedy Best First Search
const greedyBest = ( vertex: string ): void => {

    visit.add( vertex )
    path.push( vertex )
    while( vertex != GOAL ) {

        const edges = Greedy.get( vertex )
        if( edges ) {

            let minimum: string = ''
            let min: number = Infinity
            edges.forEach( edge => {

                const H = heuristic!.get( edge )
                if( !visit.has( edge ) && H && H < min ) {

                    min = H
                    minimum = edge

                }

            } )

            if( minimum === '' ) {

                console.log( 'No path found' )
                return

            }

            visit.add( minimum )
            path.push( minimum )
            vertex = minimum

        }

    }

    console.log( `Path: ${path.join( ' -> ' )}` )

}

createGraph('S', 'A', true)
createGraph('S', 'B', true)
createGraph('B', 'C', true)
createGraph('A', 'D')
createGraph('B', 'D')
createGraph('D', 'G', true)

createHeuristic()
greedyBest('S')