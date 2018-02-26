module.exports = function solveSudoku(matrix) {
    Sudoku = function(matrix) {
        var solutionArr = [];
    
        getSolutionArr(matrix);
      
        function getSolutionArr(matrix) {
            var possibleVal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for ( var i=0; i<9; i++) {
                solutionArr[i] = [];
                for ( var j=0; j<9; j++ ) {
                    if ( matrix[i][j] ) {
                        solutionArr[i][j] = [matrix[i][j], []];
                    }
                    else {
                        solutionArr[i][j] = [0, possibleVal];
                    }
                }
            }
            var changed = reducePossible(); 
            while (changed) {
                changed = reducePossible();
            }
            if ( !isSolved() ) {
                returning();
            }
        }; 
    
        function reducePossible() {
            var changed = 0;
            for ( var i=0; i<9; i++) {
                for ( var j=0; j<9; j++) {
                    if ( solutionArr[i][j][0] != 0 ) {
                        continue;
                    }
                    changed += singleMethod(i, j);
                }
            }
            return changed;
        }; 

        function singleMethod(i, j) {
            solutionArr[i][j][1] = arrayDiff(solutionArr[i][j][1], rowContent(i));
            solutionArr[i][j][1] = arrayDiff(solutionArr[i][j][1], colContent(j));
            solutionArr[i][j][1] = arrayDiff(solutionArr[i][j][1], sectContent(i, j));
            if ( solutionArr[i][j][1].length == 1 ) {
                solutionArr[i][j][0] = solutionArr[i][j][1][0];
                return 1;
            }
            return 0;
        };

        function arrayDiff (arr1, arr2) {
            var arrDiff = [];
            for ( var i=0; i<arr1.length; i++ ) {
                var isFound = false;
                for ( var j=0; j<arr2.length; j++ ) {
                    if ( arr1[i] == arr2[j] ) {
                        isFound = true;
                        break;
                    }
                }
                if ( !isFound ) {
                    arrDiff[arrDiff.length] = arr1[i];
                }
            }
            return arrDiff;
        }; 

        function rowContent(i) {
            var row = [];
            for ( var j=0; j<9; j++ ) {
                if ( solutionArr[i][j][0] != 0 ) {
                    row[row.length] = solutionArr[i][j][0];
                }
            }
            return row;
        }; 

        function colContent(j) {
            var col = [];
            for ( var i=0; i<9; i++ ) {
                if ( solutionArr[i][j][0] != 0 ) {
                    col[col.length] = solutionArr[i][j][0];
                }
            }
            return col;
        };

        function sectContent(i, j) {
            var sect = [];
            var offset =  {
                j: Math.floor(j/3)*3,
                i: Math.floor(i/3)*3
            };
            for ( var k=0; k<3; k++ ) {
                for ( var l=0; l<3; l++ ) {
                    if ( solutionArr[offset.i+k][offset.j+l][0] != 0 ) {
                        sect[sect.length] = solutionArr[offset.i+k][offset.j+l][0];
                    }
                }
            }
            return sect;
        }; 

        function isSolved() {
            var isSolved = true;
            for ( var i=0; i<9; i++) {
                for ( var j=0; j<9; j++ ) {
                    if ( solutionArr[i][j][0] == 0 ) {
                        isSolved = false;
                    }
                }
            }
            return isSolved;
        }; 
    
        this.isSolved = function() {
            return isSolved();
        }; 
    
        function returning() {
            var matrix = [[], [], [], [], [], [], [], [], []];
            var iMin=-1, jMin=-1, suggCount=0;
            for ( var i=0; i<9; i++ ) {
                matrix[i].length = 9;
                for ( var j=0; j<9; j++ ) {
                    matrix[i][j] = solutionArr[i][j][0];
                    if ( solutionArr[i][j][0] == 0 && (solutionArr[i][j][1].length < suggCount || !suggCount) ) {
                        suggCount = solutionArr[i][j][1].length;
                        iMin = i;
                        jMin = j;
                    }
                }
            }
            for ( var k=0; k<suggCount; k++ ) {
                matrix[iMin][jMin] = solutionArr[iMin][jMin][1][k];
                var sudoku = new Sudoku(matrix);
                if ( sudoku.isSolved() ) {
                    outMatr = sudoku.solved();
                    for ( var i=0; i<9; i++ ) {
                        for ( var j=0; j<9; j++ ) {
                            if ( solutionArr[i][j][0] == 0 ) {
                                solutionArr[i][j][0] = outMatr[i][j][0];
                            }
                        }
                    }
                    return;
                }
            }
        }; 
    
        this.solved = function() {
            return solutionArr;
        }; 
    }; 

    var sudoku = new Sudoku(matrix);
    var result = [[], [], [], [], [], [], [], [], []];
    for(i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            result[i][j] = sudoku.solved()[i][j][0];
        }
    }
    return result;
}
