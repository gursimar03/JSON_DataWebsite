

//myData Stores all the json data in one variable 
let myData = []

//Fetching Data from file to variable
window.onload = () => {

    let url = `data/wines.json`

    fetch(url)
        .then(response => response.json())
        .then(jsonData => {

            myData = jsonData
            topSort("Points")
        })

}

//modify and add function merged togther to add and modify values from json
function addModify(id, countryD, descriptionD, designationD, pointsD, priceD, provinceD, region_1D, region_2D, varietyD, wineryD) {


    if (document.getElementById('add').checked) {

        id = Object.keys(myData).length + 1 //gets the length of json

        myData.push({   //pushing new data to my json
            Column1: id,
            country: countryD,
            description: descriptionD,
            designation: designationD,
            points: pointsD,
            price: priceD,
            province: provinceD,
            region_1: region_1D,
            region_2: region_2D,
            variety: varietyD,
            winery: wineryD
        })

        document.getElementById("id-text").value = `..`


    } else {

        id = parseInt(id)  //modifying data 
        myData.map(wine => {
            if (wine.Column1 === id) {
                wine.country = countryD
                wine.description = descriptionD
                wine.designation = designationD
                wine.points = pointsD
                wine.price = priceD
                wine.winery = wineryD
            }
        })

    }
}

//Sorts the json for top ranking 
function topSort(key) {

    let topten

    if (key === "Points") {
        topten = myData.sort(function (a, b) { return a.points < b.points ? 1 : -1; })
            .slice(0, 10);
    }
    else {
        topten = myData.sort(function (a, b) { return a.price < b.price ? 1 : -1; })
            .slice(0, 10);
    }

    document.getElementById('rank-title').innerHTML = `Top Rankings By ${key}`
    displayTable(topten, "ranking")
}


//Displays all my data
function displayTable(array, divId) {

    let htmlString = `<table class="table table-dark">
    <tr>
         <th scope="col">ID</th>
         <th scope = "col">Winery</th>
         <th scope = "col">Variety</th>
         <th scope = "col">Points</th>
         <th scope = "col">Country</th>
         <th scope = "col">Price</th>
     </tr>`

    if (divId === "search-results") {
        array.map(wine => {
            htmlString += `<tr>
            <th scope="row">${wine.Column1}</th>
            <td><a onclick="showData(${wine.Column1})">${wine.winery}</a></td>
            <td>${wine.variety}</td>
            <td>${wine.points}</td>
            <td>${wine.country}</td>
            <td>${wine.price}</td>
            </td>
            </tr>`
        })
    }
    else {
        array.map(wine => {
            htmlString += `<tr>
            <th scope="row">${wine.Column1}</th>
            <td>${wine.winery}</td>
            <td>${wine.variety}</td>
            <td>${wine.points}</td>
            <td>${wine.country}</td>
            <td>${wine.price}</td>
            </td>
            </tr>`
        })
    }




    document.getElementById(divId).innerHTML = htmlString

}

//shows data onclick
function showData(value) {


    let htmlString = `<div id="wine-data">
                     <div>Id No : ${myData[value].Column1}</div>
                     <div>Country name: ${myData[value].country}</div>
                     <div>Discription : ${myData[value].description}</div>
                     <div>Variety : ${myData[value].variety}</div>
                     <button onclick="putData(${myData[value].Column1})" type="button"> Modify </button>
                     <button type="button" onclick="search('a')"> back </button>
                     </div>`

    document.getElementById("search-results").innerHTML = htmlString

}


search("aa")

//puts the data for user in modify 
function putData(value) {

    let a = myData.filter(wine => wine.Column1.toString().includes(value.toString())).splice(0, 1)
    document.getElementById("id-text").value = `${a[0].Column1}`
    document.getElementById("country-text").value = `${a[0].country}`
    document.getElementById("description-text").value = `${a[0].description}`
    document.getElementById("variety-text").value = `${a[0].variety}`
    document.getElementById("designation-text").value = `${a[0].designation}`
    document.getElementById("points-text").value = `${a[0].points}`
    document.getElementById("price-text").value = `${a[0].price}`
    document.getElementById("winery-text").value = `${a[0].winery}`
    document.getElementById("province-text").value = `${a[0].province}`
    document.getElementById("region_1-text").value = `${a[0].region_1}`
    document.getElementById("region_2-text").value = `${a[0].region_2}`

}

//search function to search by tags
function search(value) {
    let flag = document.getElementById("searchBy").value
    switch (flag) {
        case "winery":
            displayedBottles = myData.filter(wine => wine.winery.toString().toLowerCase().includes(value.toLowerCase()))
                .splice(0, 10)
            break;
        case "id":
            displayedBottles = myData.filter(wine => wine.Column1.toString().toLowerCase().includes(value.toLowerCase()))
                .splice(0, 10)
            break;
        case "points":
            displayedBottles = myData.filter(wine => wine.points.toString().toLowerCase().includes(value.toLowerCase()))
                .splice(0, 10)
            break;
        case "price":
            displayedBottles = myData.filter(wine => wine.price.toString().toLowerCase().includes(value.toLowerCase()))
                .splice(0, 10)
            break;
    }




    displayTable(displayedBottles, "search-results")

}

//delete functions
function deleteDataTable() {

    document.getElementById("form-table").style.display = "none"
    let htmlString = `<lable id="searchLable" for="idDeleteSearch">Search Id To delete:</lable>
                      <input id="idDeleteSearch" oninput="deleteData(parseInt(this.value))" type="text" placeholder="Search..">
                      <div id="deleteId"></div>`

    document.getElementById('delete-section').innerHTML = htmlString
    document.getElementById("delete-section").style.display = "block"

}
function deleteData(key) {

    let idRow = myData.filter(wine => wine.Column1.toString().includes(key.toString())).splice(0, 1)
    let htmlString = `<table class="table table-dark">
            <tr>
                 <th scope="col">ID</th>
                 <th scope = "col">Winery</th>
                 <th scope = "col">Variety</th>
                 <th scope = "col">Points</th>
                 <th scope = "col">Country</th>
                 <th scope = "col">Price</th>
             </tr>`

    idRow.map(wine => {
        htmlString += `<tr>
                    <th scope="row">${wine.Column1}</th>
                    <td>${wine.winery}</td>
                    <td>${wine.variety}</td>
                    <td>${wine.points}</td>
                    <td>${wine.country}</td>
                    <td>${wine.price}</td>
                    <td><button onclick="deleteFinal(${wine.Column1})">Delete</button></td>
                    </tr>`
    })
    document.getElementById('deleteId').innerHTML = htmlString

}

function deleteFinal(id) {

    let selectedIndex
    myData.map((wine, index) => {
        if (wine.Column1 === parseInt(id)) {
            selectedIndex = index
        }
    })

    myData.splice(selectedIndex, 1)

} 