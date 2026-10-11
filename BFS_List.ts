const BFSGraph: Map< number, Set< number >> = new Map()
const queue: number[] = []
const visited: Set< number > = new Set()

const addToGraph = ( vertex: number ) : void => { BFSGraph.set( vertex, new Set() ) }

// Creating graphp
const insert = ( vertex: number, edge: number, bidirectional: boolean = false ): void => {

    if( !BFSGraph.has( vertex ) ) addToGraph( vertex )
    if( !BFSGraph.has( edge ) ) addToGraph( edge )

    BFSGraph.get( vertex )?.add( edge )
    if( bidirectional ) BFSGraph.get( edge )?.add( vertex )

}

// BFS
const BFS = ( start: number ): void => {

    queue.push( start )
    visited.add( start )
    while( queue.length > 0 ) {

        const output = queue.shift()
        if( output != undefined ) {
            
            console.log( output )
            const edges = BFSGraph.get( output )
            edges?.forEach( edge => {

                // The visited condition should be applied when the edge is being added to the queue
                if( !visited.has( edge ) ) {

                    queue.push( edge )
                    visited.add( edge )

                }

            })
            
        }

    }

}

// Check for unvisited vertices and perform BFS on them to ensure all components are covered
const balance = () => {

    for( const key of BFSGraph.keys() ) {

        if( !visited.has( key ) ) BFS( key )

    }

}

insert( 55, 15 )
insert( 55, 1 )
insert( 55 , 2)
insert( 1, 2, true )
insert( 1, 21 )
insert( 6, 2 )
insert( 21, 44 )
insert( 44, 6 )

balance()