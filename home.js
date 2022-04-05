const primaryNav = document.querySelector('.primary-navigation')
const navToggle = document.querySelector('.mobile-nav-toggle')

navToggle.addEventListener('click',
    () => {
        const visibility = primaryNav.getAttribute('data-visible')

        if (visibility === "false") {
            primaryNav.setAttribute('data-visible', true)
        }
        else if (visibility === "true") {
            primaryNav.setAttribute('data-visible', false)
        }
    }
)
let myData = []





window.onload = () => {

    let url = `data/wines.json`      /* name of the JSON file */



    fetch(url)
        .then(response => response.json())
        .then(jsonData => {

            // let top10 = jsonData.sort(function (a, b) { return a.points < b.points ? 1 : -1; })
            //     .slice(0, 10);
            myData = jsonData
            //     let htmlString = `<table class="table table-dark">
            //                        <tr>
            //                             <th scope = "col">Winery</th>
            //                             <th scope = "col">Variety</th>
            //                             <th scope = "col">Points</th>
            //                             <th scope = "col">Country</th>
            //                             <th scope = "col">Price</th>
            //                         </tr>`

            //     top10.map(wine => {
            //         htmlString += `<tr>
            //                        <td>${wine.winery}</td>
            //                        <td>${wine.variety}</td>
            //                        <td>${wine.points}</td>
            //                        <td>${wine.country}</td>
            //                        <td>${wine.price}</td>
            //                   </tr>`
            //     })

            //     htmlString += `</table><br>${top10.length} records found.`
            //     document.getElementById('wine').innerHTML = htmlString

            topSort("Points")

        })

}

function display(bottles, content) {

    let htmlString = `<table class="table table-dark">
    <tr>
         <th scope="col">#</th>
         <th scope = "col">Winery</th>
         <th scope = "col">Variety</th>
         <th scope = "col">Points</th>
         <th scope = "col">Country</th>
         <th scope = "col">Price</th>
     </tr>`

    bottles.map(wine => {
        htmlString += `<tr><button id="clickMe" type="button" value="clickme" onclick="doFunction();">
        <th scope="row">${wine.Column1}</th>
        <td>${wine.winery}</td>
        <td>${wine.variety}</td>
        <td>${wine.points}</td>
        <td>${wine.country}</td>
        <td>${wine.price}</td>
        <td><button id="info" onclick="myFunction('${wine.Column1}','${wine.winery}','${wine.country}','${wine.description}','${wine.price}')">More Info</button>
        </td>
        </tr>`
    })


    document.getElementById(content).innerHTML = htmlString
    console.log(content,htmlString)
}

function topSort(event) {

    let top10

    if (event === "Points") {
        top10 = myData.sort(function (a, b) { return a.points < b.points ? 1 : -1; })
            .slice(0, 10);
    }
    else {
        top10 = myData.sort(function (a, b) { return a.price < b.price ? 1 : -1; })
            .slice(0, 10);
    }

    document.getElementById('rankBy').innerHTML = `Top Rankings By ${event}`
    display(top10, "wine")
}

let sortedData = []
let flager = ""

searchSort("winery")
let flag
function searchSort(flag){

    flager = flag

    switch (flag) {
        case "winery":
                sortedData = myData.sort(function (a,b){return a.winery < b.winery ? 1 : -1})
            break;
        case "country":
            sortedData = myData.sort(function (a,b){return a.country < b.country ? 1 : -1})
            break;
        case "points":
            sortedData = myData.sort(function (a,b){return a.points < b.points ? 1 : -1})
            break;
        case "variety":
            sortedData = myData.sort(function (a,b){return a.variety < b.variety ? 1 : -1})
            break;
        default:

            break;
    }

    console.log(sortedData)

}

function search(value) {
    let displayedBottles = []

    
    switch (flager) {
        case "winery":
            displayedBottles = myData.filter(wine => wine.winery.toString().toLowerCase().includes(value.toLowerCase()))
            .splice(0, 10)
            break;
        case "country":
            displayedBottles = myData.filter(wine => wine.country.toString().toLowerCase().includes(value.toLowerCase()))
            .splice(0, 10)
            break;
        case "points":
            displayedBottles = myData.filter(wine => wine.points.toString().toLowerCase().includes(value.toLowerCase()))
            .splice(0, 10)
            break;
        case "variety":
            displayedBottles = myData.filter(wine => wine.variety.toString().toLowerCase().includes(value.toLowerCase()))
            .splice(0, 10)
            break;
        default:

            break;

        
    }
    console.log(displayedBottles)

    display(displayedBottles, "results")

}
var el = document.getElementById('info');
if(el){
    el.addEventListener('click', myFunction());
}


function myFunction(id,winery,country,description,price) {
  
    console.log(id,winery,country,description,price)

}

