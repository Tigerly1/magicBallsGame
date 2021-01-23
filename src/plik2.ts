export default class ShortestPath {
    public idArray: Array<Array<number>>
    public aArray: Array<Array<string>>
    public bArray: Array<Array<Array<string>>>
    public path: Array<string>
    constructor(
        actualSpheres: Array<Array<number>>,
        Start: Array<number>,
        Meta: Array<number>
    ) {
        this.idArray = []
        this.aArray = []
        this.bArray = []
        this.path = []
        //console.log("najkrótsza ścieżka")
        this.CreateArrays(actualSpheres, Start, Meta)
    }
    private CreateArrays(
        actualSpheres: Array<Array<number>>,
        Start: Array<number>,
        Meta: Array<number>
    ) {
        for (let i = 0; i < 9; i++) {
            this.aArray.push([])
            this.bArray.push([])
            for (let j = 0; j < 9; j++) {
                if (Start[0] == i && Start[1] == j) {
                    this.aArray[i].push("S")
                } else if (Meta[0] == i && Meta[1] == j) {
                    this.aArray[i].push("M")
                } else if (actualSpheres[i][j] != 0) {
                    this.aArray[i].push("X")
                } else {
                    this.aArray[i].push("0")
                }
                this.bArray[i].push([])
            }
        }
        this.NumberEmptyArrays(Start)
    }
    private NumberEmptyArrays(Start: Array<number>) {
        var end: boolean = false
        var x: number = 0
        var path: Array<string> = []
        do {
            if (x == 0) {
                this.bArray[Start[0]][Start[1]][0] =
                    String(Start[0]) + "_" + String(Start[1])
            }
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (
                        (this.aArray[i][j] == String(x) && String(x) != "0") ||
                        (this.aArray[i][j] == "S" && String(x) == "0")
                    ) {
                        let moveLeft: number = j - 1
                        let moveRight: number = j + 1
                        let moveUp: number = i - 1
                        let moveDown: number = i + 1
                        if (moveLeft >= 0)
                            if (this.aArray[i][moveLeft] == "0") {
                                this.aArray[i][moveLeft] = String(x + 1)
                                this.bArray[i][moveLeft] = this.bArray[i][
                                    moveLeft
                                ].concat(this.bArray[i][j], [
                                    String(i) + "_" + String(moveLeft)
                                ])
                            } else if (
                                this.aArray[i][moveLeft] == "M" &&
                                this.bArray[i][moveLeft].length == 0
                            ) {
                                this.bArray[i][moveLeft] = this.bArray[i][
                                    moveLeft
                                ].concat(this.bArray[i][j], [
                                    String(i) + "_" + String(moveLeft)
                                ])
                                end = true
                                path = this.bArray[i][moveLeft]
                                break
                            }

                        if (moveRight <= 8)
                            if (this.aArray[i][moveRight] == "0") {
                                this.aArray[i][moveRight] = String(x + 1)
                                this.bArray[i][moveRight] = this.bArray[i][
                                    moveRight
                                ].concat(this.bArray[i][j], [
                                    String(i) + "_" + String(moveRight)
                                ])
                            } else if (
                                this.aArray[i][moveRight] == "M" &&
                                this.bArray[i][moveRight].length == 0
                            ) {
                                this.bArray[i][moveRight] = this.bArray[i][
                                    moveRight
                                ].concat(this.bArray[i][j], [
                                    String(i) + "_" + String(moveRight)
                                ])
                                path = this.bArray[i][moveRight]
                                end = true
                                break
                            }

                        if (moveUp >= 0)
                            if (this.aArray[moveUp][j] == "0") {
                                this.aArray[moveUp][j] = String(x + 1)
                                this.bArray[moveUp][j] = this.bArray[moveUp][
                                    j
                                ].concat(this.bArray[i][j], [
                                    String(moveUp) + "_" + String(j)
                                ])
                            } else if (
                                this.aArray[moveUp][j] == "M" &&
                                this.bArray[moveUp][j].length == 0
                            ) {
                                this.bArray[moveUp][j] = this.bArray[moveUp][
                                    j
                                ].concat(this.bArray[i][j], [
                                    String(moveUp) + "_" + String(j)
                                ])
                                end = true
                                path = this.bArray[moveUp][j]
                                break
                            }
                        if (moveDown <= 8)
                            if (this.aArray[moveDown][j] == "0") {
                                this.aArray[moveDown][j] = String(x + 1)
                                this.bArray[moveDown][j] = this.bArray[
                                    moveDown
                                ][j].concat(this.bArray[i][j], [
                                    String(moveDown) + "_" + String(j)
                                ])
                            } else if (
                                this.aArray[moveDown][j] == "M" &&
                                this.bArray[moveDown][j].length == 0
                            ) {
                                this.bArray[moveDown][j] = this.bArray[
                                    moveDown
                                ][j].concat(this.bArray[i][j], [
                                    String(moveDown) + "_" + String(j)
                                ])
                                end = true
                                path = this.bArray[moveDown][j]
                                break
                            }
                    }
                }
            }
            x++
            if (x == 81) {
                end = true
            }
        } while (!end)
        this.path = path
    }
}
