interface Cell {

    state: number,
    visited: boolean

}

const row = 4
const column = 5
const input: number[][] = [

    [1, 0, 0, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1]

]
const graph: Cell[][] = input.map(row => row.map( num => ({ state: num, visited: false }) ) )
const riverSizes: number[] = []

const checkRiverSize = (): void => {

    for( let i = 0; i < row; i++ ) {

        for( let j = 0; j < column; j++ ) {

            if( graph[i][j].visited ) continue
            if( graph[i][j].state === 0 ) continue
            else {

                const size = calculateRiverSize( i, j )
                if( size ) riverSizes.push( size )

            }

        }

    }

    console.log( riverSizes )

}

// BFS
const calculateRiverSize = ( i: number, j: number ): number | void => {

    let count = 0
    const queue: [ number, number ][] = [ [i, j ]]

    while( queue.length > 0 ) {

        const [ x, y ] = queue.shift() as [ number, number ]
        graph[x][y].visited = true
        const nearest: [ number, number ][] = findNearest( x, y )
        if( nearest.length > 0 ) queue.push( ...nearest )
        count++

    }

    if( count > 0 ) return count

}

const findNearest = ( i: number, j: number ): [ number, number ][] => {

    const directions: [ number, number ][] = []

    if( i > 0 && graph[i - 1][j].state === 1 && !graph[i - 1][j].visited ) directions.push( [ i - 1, j ] ) // Top
    if( i < row - 1 && graph[i + 1][j].state === 1 && !graph[i + 1][j].visited ) directions.push( [ i + 1, j ] ) // Bottom
    if( j > 0 && graph[i][j - 1].state === 1 && !graph[i][j - 1].visited ) directions.push( [ i, j - 1 ] ) // Left
    if( j < column - 1 && graph[i][j + 1].state === 1 && !graph[i][j + 1].visited ) directions.push( [ i, j + 1 ] ) // Right

    return directions

}

checkRiverSize()