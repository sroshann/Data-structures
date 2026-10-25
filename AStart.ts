// Grapg with vertex, edges and edge weights
const Star = new Map< string, Map< string, number > >()
const starHeuristic = new Map< string, number >() // Stores heuristic values
const visited: Set< string > = new Set() // Stores visited vertex
const shortestPath: string[] = []

const HEURISTIC: number[] = [ 5, 6, 4, 3, 3, 1, 0 ]
const START: string = 'A'
const END: string = 'G'

const create = (

    vertex: string, edge: string,
    weight: number, biDirectional: boolean = false

): void => {

    if( !Star.has( vertex ) ) Star.set( vertex, new Map() )
    if( !Star.has( edge ) ) Star.set( edge, new Map() )
    Star.get( vertex )?.set( edge, weight )
    if( biDirectional ) Star.get( edge )?.set( vertex, weight )

}

const setHeuiristic = (): void => {

    let i: number = 0
    for( let vertex of Star.keys() ) {

        starHeuristic.set( vertex, HEURISTIC[i] )
        i++

    }

}

const AStar = ( vertex: string ): void => {

    visited.add( vertex )
    shortestPath.push( vertex )
    while( vertex != END ) {

        const edges = Star.get( vertex )
        if( !edges ) continue
        let minimum: string = ''
        let result: number = Infinity
        edges.forEach( ( weight, edge ) => {
            
            let fn: number = 0
            const gn = starHeuristic.get( edge )
            if( gn ) fn = weight + gn
            if( !visited.has( edge ) && fn <= result ) {

                result = fn
                minimum = edge

            }

        } )

        if( minimum === '' ) {

            console.log('No such path is found')
            return

        }

        visited.add( minimum )
        shortestPath.push( minimum )
        vertex = minimum

    }

    console.log('Path = ', shortestPath.join(' -> '))

}

create('A', 'B', 1)
create('A', 'C', 4)
create('B', 'C', 2)
create('B', 'D', 3)
create('C', 'E', 5)
create('D', 'F', 2)
create('D', 'G', 4)
create('E', 'G', 3)
create('F', 'G', 1)

setHeuiristic()
AStar('A')