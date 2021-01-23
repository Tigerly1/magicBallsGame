document.addEventListener("DOMContentLoaded", () => {
    let colorsArray: Array<string> = [
        "#cf462d",
        "#cf992d",
        "#55cf2d",
        "#2dcfc7",
        "#962dcf",
        "#cf2db9",
        "#e0d90d"
    ]
    let plansza = new Plansza(colorsArray)
    let CurrentArray: Array<Array<number>> = plansza.ActualSpheres

    //console.log(CurrentArray)
})
function parametro(target: any, propertyKey: number, parameterIndex: number) {
    let val = target[propertyKey]
    console.log(val)
    const getter = () => {
        console.log(val)
        return val
    }

    const setter = (score: number) => {
        console.log(score)
        if (+score > 100) val = "WOW" + score
        else if (+score > 0) val = "LOW PLS BEGIN" + score
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}

function beatAnimation(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    let originalMethod = descriptor.value
    descriptor.value = function(arrayRemove: Array<Array<string>>) {
        //console.log(arrayRemove)
        arrayRemove.forEach(function(el, i) {
            arrayRemove[i].forEach(element => {
                //console.log(element[0])
                var boardDiv: HTMLElement = document.getElementById("board")
                var boardDivNode: HTMLElement
                var boardsphereNode: HTMLElement
                boardDivNode = <HTMLScriptElement>(
                    boardDiv.children[Number(element[0])].children[
                        Number(element[2])
                    ]
                )
                boardsphereNode = <HTMLScriptElement>(
                    boardDiv.children[Number(element[0])].children[
                        Number(element[2])
                    ].children[0]
                )
                boardDivNode.style.backgroundColor =
                    boardsphereNode.style.backgroundColor
            })
        })
        var result = originalMethod.apply(this, [arrayRemove])

        return result
    }
}

function scoreAnimate(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    let originalMethod = descriptor.value
    descriptor.value = function(args: any[]) {
        let anim = document.getElementById("points")
        var time = 0
        let timer = setInterval(() => {
            var r = Math.floor(Math.random() * 256) // Random between 0-255
            var g = Math.floor(Math.random() * 256) // Random between 0-255
            var b = Math.floor(Math.random() * 256) // Random between 0-255
            var rgb = "rgb(" + r + "," + g + "," + b + ")"
            time += 150
            anim.style.color = rgb
            if (time >= 5000) {
                clearInterval(timer)
                anim.style.color = "black"
            }
        }, 150)
        var result = originalMethod.apply(this)
        return
    }
}

function ClassDecorator(constructor: Function) {
    constructor.prototype.decorate = (element: HTMLElement) => {
        let opacity: number = 0
        element.style.opacity = String(opacity)
        let timer = setInterval(() => {
            element.style.opacity = String(opacity)
            opacity += 0.1
            if (opacity > 0.9) {
                clearInterval(timer)
                element.style.opacity = "1"
            }
        }, 50)
    }
}
import ShortestPath from "./plik2"
@ClassDecorator
class Plansza {
    public colors: Array<string>
    public ActualSpheres: Array<Array<number>>
    public SphereChoosen: Array<number>
    public points: number
    private DropShere: boolean
    private previous: HTMLElement
    decorate: any

    constructor(colorsArray: Array<string>) {
        this.colors = colorsArray
        this.points = 0
        this.ActualSpheres = [[]]
        this.DropShere = false
        this.boardMake()
        this.SphereChoosen = []
        this.previous = null
    }
    public boardMake() {
        let ActualSpheres: Array<Array<number>> = []
        let numberOfRows: number = 9
        for (let i: number = 0; i < numberOfRows; i++) {
            ActualSpheres.push([])
            let div: HTMLDivElement = document.createElement("div")
            div.className = "column"
            document.getElementById("board").appendChild(div)
            for (let j: number = 0; j < numberOfRows; j++) {
                let divInside: HTMLDivElement = document.createElement("div")
                divInside.className = "inColumn"
                let SphereDestination: Array<number> = [i, j]
                divInside.addEventListener("mouseover", () => {
                    if (
                        this.SphereChoosen.length > 0 &&
                        divInside.childNodes.length == 0
                    ) {
                        this.emptyDivColors()

                        let path = new ShortestPath(
                            this.ActualSpheres,
                            this.SphereChoosen,
                            SphereDestination
                        )
                        //console.log(path.path)
                        if (path.path.length > 0) {
                            this.DropShere = true
                        } else this.DropShere = false
                        path.path.map(el => {
                            var boardDiv: HTMLElement = document.getElementById(
                                "board"
                            )
                            var boardDivNodes: HTMLElement
                            boardDivNodes = <HTMLScriptElement>(
                                boardDiv.children[Number(el[0])].children[
                                    Number(el[2])
                                ]
                            )
                            boardDivNodes.style.backgroundColor = "#f0834d    "
                            //console.log(boardDivNodes)
                        })
                    } else {
                        //this.emptyDivColors()
                    }
                })
                div.appendChild(divInside)

                divInside.onclick = () => {
                    this.emptyDivColors()
                    if (divInside.childNodes.length == 1) {
                        //console.log(this.SphereChoosen)
                        if (
                            this.SphereChoosen[0] == i &&
                            this.SphereChoosen[1] == j
                        ) {
                            this.SphereChoosen = []
                            var boardDivNode: HTMLElement
                            boardDivNode = <HTMLScriptElement>(
                                divInside.children[0]
                            )
                            boardDivNode.style.width = "30px"
                            boardDivNode.style.height = "30px"
                            boardDivNode.style.margin = "10px"
                            boardDivNode.style.borderRadius = "15px"
                        } else {
                            this.SphereChoosen = [i, j]
                            var boardDivNode: HTMLElement
                            boardDivNode = <HTMLScriptElement>(
                                divInside.children[0]
                            )
                            if (this.previous != null) {
                                this.previous.style.width = "30px"
                                this.previous.style.height = "30px"
                                this.previous.style.margin = "10px"
                                this.previous.style.borderRadius = "15px"
                            }
                            if (this.SphereChoosen[0] - 1 >= 0) {
                                if (
                                    this.ActualSpheres[
                                        this.SphereChoosen[0] - 1
                                    ][this.SphereChoosen[1]] == 0
                                ) {
                                    boardDivNode.style.width = "40px"
                                    boardDivNode.style.height = "40px"
                                    boardDivNode.style.margin = "5px"
                                    boardDivNode.style.borderRadius = "20px"
                                    this.previous = boardDivNode
                                }
                            }
                            if (this.SphereChoosen[0] + 1 <= 8) {
                                if (
                                    this.ActualSpheres[
                                        this.SphereChoosen[0] + 1
                                    ][this.SphereChoosen[1]] == 0
                                ) {
                                    boardDivNode.style.width = "40px"
                                    boardDivNode.style.height = "40px"
                                    boardDivNode.style.margin = "5px"
                                    boardDivNode.style.borderRadius = "20px"
                                    this.previous = boardDivNode
                                }
                            }
                            if (this.SphereChoosen[1] - 1 >= 0) {
                                if (
                                    this.ActualSpheres[this.SphereChoosen[0]][
                                        this.SphereChoosen[1] - 1
                                    ] == 0
                                ) {
                                    boardDivNode.style.width = "40px"
                                    boardDivNode.style.height = "40px"
                                    boardDivNode.style.margin = "5px"
                                    boardDivNode.style.borderRadius = "20px"
                                    this.previous = boardDivNode
                                }
                            }
                            if (this.SphereChoosen[1] + 1 <= 8) {
                                if (
                                    this.ActualSpheres[this.SphereChoosen[0]][
                                        this.SphereChoosen[1] + 1
                                    ] == 0
                                ) {
                                    boardDivNode.style.width = "40px"
                                    boardDivNode.style.height = "40px"
                                    boardDivNode.style.margin = "5px"
                                    boardDivNode.style.borderRadius = "20px"
                                    this.previous = boardDivNode
                                }
                            }
                        }
                    }
                    if (
                        this.DropShere &&
                        this.SphereChoosen != SphereDestination &&
                        divInside.childNodes.length == 0
                    ) {
                        let sphere: HTMLDivElement = document.createElement(
                            "div"
                        )
                        sphere.className = "sphere"
                        sphere.style.backgroundColor = this.colors[
                            this.ActualSpheres[this.SphereChoosen[0]][
                                this.SphereChoosen[1]
                            ] - 1
                        ]

                        var boardDiv: HTMLElement = document.getElementById(
                            "board"
                        )
                        var boardDivNodeRemove: HTMLElement
                        boardDivNodeRemove = <HTMLScriptElement>(
                            boardDiv.children[this.SphereChoosen[0]].children[
                                this.SphereChoosen[1]
                            ]
                        )
                        boardDivNodeRemove.removeChild(
                            boardDivNodeRemove.children[0]
                        )
                        this.ActualSpheres[SphereDestination[0]][
                            SphereDestination[1]
                        ] = this.ActualSpheres[this.SphereChoosen[0]][
                            this.SphereChoosen[1]
                        ]
                        this.ActualSpheres[this.SphereChoosen[0]][
                            this.SphereChoosen[1]
                        ] = 0
                        this.SphereChoosen = []
                        this.DropShere = false
                        this.emptyDivColors()
                        var boardDivNodeAdd: HTMLElement
                        boardDivNodeAdd = <HTMLScriptElement>(
                            boardDiv.children[SphereDestination[0]].children[
                                SphereDestination[1]
                            ]
                        )
                        boardDivNodeAdd.appendChild(sphere)
                        this.decorate(sphere)
                        let points = this.beating()
                        this.points += points
                        if (points == 0) {
                            let marek = setTimeout(() => {
                                this.addSpheres(this.ActualSpheres, colors)
                                colors = this.previewSpheres()
                            }, 300)
                        } else {
                            this.addPoints(points)
                            this.raddPoints(this.points)
                        }
                    }
                }
                ActualSpheres[i].push(0)
            }
        }
        var colors = this.previewSpheres()
        this.addSpheres(ActualSpheres, colors)
        colors = this.previewSpheres()
    }
    @scoreAnimate
    private addPoints(points: number) {}
    private raddPoints(@parametro points: number) {
        document.getElementById("points").innerHTML = "Punkty: " + points
    }
    private emptyDivColors() {
        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                var boardDiv: HTMLElement = document.getElementById("board")
                var boardDivNodes: HTMLElement
                boardDivNodes = <HTMLScriptElement>(
                    boardDiv.children[x].children[y]
                )
                boardDivNodes.style.backgroundColor = "white"
            }
        }
    }
    private previewSpheres() {
        let array: Array<number> = []
        let previewClear: HTMLElement = document.getElementById("preview")
        previewClear.querySelectorAll("*").forEach(n => n.remove())
        for (let i = 0; i < 3; i++) {
            let color: number = Math.floor(Math.random() * 3) + 1
            array.push(color)
            let sphere: HTMLDivElement = document.createElement("div")
            sphere.className = "sphere"
            sphere.style.backgroundColor = this.colors[color - 1]
            document.getElementById("preview").append(sphere)
        }

        return array
    }
    private addSpheres(
        ActualSpheres: Array<Array<number>>,
        color: Array<number>
    ) {
        let x: number = 0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (ActualSpheres[i][j] == 0) {
                    x++
                }
            }
        }
        if (x > 3) {
            for (let i = 0; i < color.length; i++) {
                let colors: number = color[i]
                let tabx: number = Math.floor(Math.random() * 9)
                let taby: number = Math.floor(Math.random() * 9)
                if (ActualSpheres[tabx][taby] > 0) {
                    i--
                } else ActualSpheres[tabx][taby] = colors
            }
            this.ShowSpheres(ActualSpheres, this.colors)
            return (this.ActualSpheres = ActualSpheres)
        } else {
            this.endGame()
        }
    }

    public endGame() {
        alert("Twoje punkty to: " + this.points)
        location.reload()
    }
    public ShowSpheres(
        ActualSpheres: Array<Array<number>>,
        colors: Array<string>
    ) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                var boardDiv: HTMLElement = document.getElementById("board")
                var boardDivNodeRemove: HTMLElement
                boardDivNodeRemove = <HTMLScriptElement>(
                    boardDiv.children[i].children[j]
                )
                if (boardDivNodeRemove.children.length > 0) {
                    boardDivNodeRemove.removeChild(
                        boardDivNodeRemove.children[0]
                    )
                }

                if (ActualSpheres[i][j] > 0) {
                    let sphere: HTMLDivElement = document.createElement("div")
                    sphere.className = "sphere"
                    sphere.style.backgroundColor =
                        colors[ActualSpheres[i][j] - 1]
                    var boardDiv: HTMLElement = document.getElementById("board")
                    var boardDivNodes = <HTMLScriptElement>(
                        boardDiv.childNodes[i].childNodes[j]
                    )
                    boardDivNodes.appendChild(sphere)
                }
            }
        }
    }
    private beating() {
        var points: number = 0
        var arrayRemove: Array<Array<string>> = [[], [], [], []]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let sphereID: number = this.ActualSpheres[i][j]
                let spheretrain: Array<boolean> = [
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false,
                    false
                ]
                let sphereColummn: Array<string> = []
                let sphereRow: Array<string> = []
                let sphereLeanDec: Array<string> = []
                let sphereLeanIncreasing: Array<string> = []
                if (sphereID > 0) {
                    for (let x = 0; x < 9; x++) {
                        let up: number = i - x
                        let right: number = j + x
                        let down: number = i + x
                        let left: number = j - x
                        if (up >= 0) {
                            if (this.ActualSpheres[up][j] != sphereID)
                                spheretrain[0] = true
                            if (
                                this.ActualSpheres[up][j] == sphereID &&
                                spheretrain[0] == false
                            ) {
                                sphereColummn.push(String(up) + "_" + String(j))
                            }
                        }
                        if (right < 9) {
                            if (this.ActualSpheres[i][right] != sphereID)
                                spheretrain[1] = true
                            if (
                                this.ActualSpheres[i][right] == sphereID &&
                                spheretrain[1] == false
                            ) {
                                sphereRow.push(String(i) + "_" + String(right))
                            }
                        }
                        if (down < 9) {
                            if (this.ActualSpheres[down][j] != sphereID)
                                spheretrain[2] = true
                            if (
                                this.ActualSpheres[down][j] == sphereID &&
                                spheretrain[2] == false
                            ) {
                                sphereColummn.push(
                                    String(down) + "_" + String(j)
                                )
                            }
                        }
                        if (left >= 0) {
                            if (this.ActualSpheres[i][left] != sphereID)
                                spheretrain[3] = true
                            if (
                                this.ActualSpheres[i][left] == sphereID &&
                                spheretrain[3] == false
                            ) {
                                sphereRow.push(String(i) + "_" + String(left))
                            }
                        }
                        if (up >= 0 && right < 9) {
                            if (this.ActualSpheres[up][right] != sphereID)
                                spheretrain[4] = true
                            if (
                                this.ActualSpheres[up][right] == sphereID &&
                                spheretrain[4] == false
                            ) {
                                sphereLeanIncreasing.push(
                                    String(up) + "_" + String(right)
                                )
                            }
                        }
                        if (down < 9 && right < 9) {
                            if (this.ActualSpheres[down][right] != sphereID)
                                spheretrain[5] = true
                            if (
                                this.ActualSpheres[down][right] == sphereID &&
                                spheretrain[5] == false
                            ) {
                                sphereLeanDec.push(
                                    String(down) + "_" + String(right)
                                )
                            }
                        }
                        if (down < 9 && left >= 0) {
                            if (this.ActualSpheres[down][left] != sphereID)
                                spheretrain[6] = true
                            if (
                                this.ActualSpheres[down][left] == sphereID &&
                                spheretrain[6] == false
                            ) {
                                sphereLeanIncreasing.push(
                                    String(down) + "_" + String(left)
                                )
                            }
                        }
                        if (up >= 0 && left >= 0) {
                            if (this.ActualSpheres[up][left] != sphereID)
                                spheretrain[7] = true
                            if (
                                this.ActualSpheres[up][left] == sphereID &&
                                spheretrain[7] == false
                            ) {
                                sphereLeanDec.push(
                                    String(up) + "_" + String(left)
                                )
                            }
                        }
                    }
                    if (sphereColummn.length >= 6) {
                        points = sphereColummn.length - 1
                        arrayRemove[0] = sphereColummn
                    }
                    if (sphereRow.length >= 6) {
                        points = sphereRow.length - 1
                        arrayRemove[1] = sphereRow
                    }
                    if (sphereLeanDec.length >= 6) {
                        points = sphereLeanDec.length - 1
                        arrayRemove[2] = sphereLeanDec
                    }
                    if (sphereLeanIncreasing.length >= 6) {
                        points = sphereLeanIncreasing.length - 1
                        arrayRemove[3] = sphereLeanIncreasing
                    }
                }
            }
        }
        let arrayWithPoints: Array<string> = []

        arrayRemove.forEach((el, i) => {
            arrayRemove[i].forEach(element => {
                if (arrayWithPoints.indexOf(element) < 0) {
                    arrayWithPoints.push(element)
                }
            })
        })
        points = arrayWithPoints.length
        this.removeSpheres(arrayRemove)
        console.log(arrayRemove)
        return points
    }
    @beatAnimation
    public removeSpheres(arrayRemove: Array<Array<string>>) {
        console.log(arrayRemove)
        arrayRemove.forEach((el, i) => {
            arrayRemove[i].forEach(element => {
                this.ActualSpheres[Number(element[0])][Number(element[2])] = 0
                console.log(element)
                var boardDiv: HTMLElement = document.getElementById("board")
                var boardDivNodeRemove: HTMLElement
                boardDivNodeRemove = <HTMLScriptElement>(
                    boardDiv.children[Number(element[0])].children[
                        Number(element[2])
                    ]
                )
                if (boardDivNodeRemove.children.length > 0) {
                    boardDivNodeRemove.removeChild(
                        boardDivNodeRemove.children[0]
                    )
                }
            })
        })
        setTimeout(() => {
            this.emptyDivColors()
        }, 2000)
    }
}
