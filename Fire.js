const fireWidth = 40;
const fireHeight = 40;
const dataBase =[];
const palette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
const debug=false

function start(){
    createDataBase()
    createFireSource()
    setInterval(claculatePropagation,50)
}
function createDataBase(){
    for(let i=0;i<(fireHeight*fireWidth);i++){
        dataBase[i]=0;
    }

}
function claculatePropagation(){
    for(let col=0;col < fireWidth;col++){
        for(let row=0;row<fireHeight;row++){
            const pixelIndex = col+(fireWidth*row)
            updatePixelIndex(pixelIndex)
        }
    }
    render()
}
function updatePixelIndex(index){
    const bellowFireIndex = index+fireWidth

    if(bellowFireIndex >= (fireHeight*fireWidth)){
        return
    }
    const decay = Math.floor(Math.random()*3)
    const bellowIntensity = dataBase[bellowFireIndex]
    const newFireIntensity = bellowIntensity-decay >=0?bellowIntensity-decay:0
    dataBase[index -decay] = newFireIntensity
}
function render(){
    let html = "<table cellpadding=0 cellspacing=0"
    for(let row=0;row < fireHeight;row++){
        html+="<tr>"

        for(let col=0;col<fireHeight;col++){
            const pixelIndex = col+(fireWidth*row)
            const intesity = dataBase[pixelIndex]

            if(debug){
                const color = palette[intesity]
                const colorString = `${color.r},${color.g},${color.b}`
            html+=`<td style="color:rgb(${colorString})">`
            html+=`<div class="pixel-index" >${intesity}</div>`
            html+="</td>"
            }else{
                console.log(intesity)
                const color = palette[intesity]
                const colorString = `${color.r},${color.g},${color.b}`
                html+=`<td class="pixel" style="background-color:rgb(${colorString})">`
                html+="</td>"
            }
      
        }
        html+="</tr>"
    }
    html+="</table>"
    document.querySelector("#fireCanvas").innerHTML = html
}
function createFireSource(){
    for(let col=0;col<=fireWidth;col++){
        const overflowIndex = fireHeight*fireWidth;
        const pIndex = (overflowIndex-fireWidth)+col
        dataBase[pIndex] = 36
    }
}
start()