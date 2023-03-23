const msg = document.querySelector(".msg")
const inputName = document.getElementById("name");
const description = document.getElementById("description")
const btn = document.getElementById("btn");
const candieList = document.getElementById("candieList")
const quantityOfCandies = document.getElementById("quantity");
const editBtn = document.getElementById("editBtn");

btn.addEventListener("click", addCandiesToCandieList);

//SUBMITING NEW USER
function addCandiesToCandieList(e) {
    e.preventDefault()
    let candieDetails = {
        name: inputName.value,
        numberOfCandies: quantityOfCandies.value,
        descriptionOfCandies: description.value
    }
    axios.post(
        "https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails", candieDetails
    ).then(res => {
        showNewCandiesOnScreen(res.data)
    }).catch(err => {
        document.write("Something Went Wrong")
    })
    description.value = ''
    inputName.value = ''
    quantityOfCandies.value = ''
}

//BUY ONE CANDIE
function buyOneCandie(objId, objName, objdes, objquantity) {
    
    if (objquantity <= 0) {
        msg.innerText = "OUT OF STOCK"
        setTimeout(() => {
            msg.innerText = ''
        }, 2000);
    } else {
        //deleting from the server
        axios.delete(`https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails/${objId}`).then(() => {
            removeNodeFromScreen(objId)
        }).then(() => {
            objquantity--
            //posting updated candies details on the screen
            let updatedObj = {
                name: objName,
                numberOfCandies: objquantity,
                descriptionOfCandies: objdes
            }
            axios.post(`https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails`, updatedObj).then((res) => {
                showNewCandiesOnScreen(res.data)
            })
        })
    }
}

//BUY TWO CANDIES
function buyTwoCandie(objId, objName, objdes, objquantity) {
    if (objquantity <= 0) {
        msg.innerText = "OUT OF STOCK"
        setTimeout(() => {
            msg.innerText = ''
        }, 2000);
    }else{
            objquantity -= 2
            if(objquantity<0){
                msg.innerText = "OUT OF STOCK"
                setTimeout(() => {
                    msg.innerText = ''
                }, 2000);
                objquantity+=2
            }else{
                //deleting from the server
                axios.delete(`https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails/${objId}`).then(() => {
                    removeNodeFromScreen(objId)
                }).then(() => {
                    //posting updated candies details on the screen
                    let updatedObj = {
                        name: objName,
                        numberOfCandies: objquantity,
                        descriptionOfCandies: objdes
                    }
                    axios.post(`https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails`, updatedObj).then((res) => {
                        showNewCandiesOnScreen(res.data)
                    })
                })
            }
    }

}

//BUY THREE CANDIES
function buyThreeCandie(objId, objName, objdes, objquantity) {
    if (objquantity <= 0) {
        msg.innerText = "OUT OF STOCK"
        setTimeout(() => {
            msg.innerText = ''
        }, 2000);
    }else {
        objquantity -= 3
        if(objquantity<0){
            msg.innerText = "OUT OF STOCK"
            setTimeout(() => {
                msg.innerText = ''
            }, 2000);
            objquantity+=3
        }else{
            //deleting from the server
            axios.delete(`https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails/${objId}`).then(() => {
                removeNodeFromScreen(objId)
            }).then(() => {
                //posting updated candies details on the screen
                let updatedObj = {
                    name: objName,
                    numberOfCandies: objquantity,
                    descriptionOfCandies: objdes
                }
                axios.post(`https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails`, updatedObj).then((res) => {
                    showNewCandiesOnScreen(res.data)
                })
            })
        }   
    }
}

//GETTING ALL THE DATA FROM THE SERVER AND DISPLAY ON THE SCREEN
window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails").then((res) => {
        for (let i = 0; i < res.data.length; i++) {
            showNewCandiesOnScreen(res.data[i])
        }
    })
})

//CREATING NEW CANDIE AND SHOWING ON THE SCREEN
function showNewCandiesOnScreen(obj) {
    let childNode = ` <li id="${obj._id}">${obj.name} ${obj.descriptionOfCandies} ${obj.numberOfCandies}
    <button id="buyOneCandie" onclick="buyOneCandie('${obj._id}','${obj.name}','${obj.descriptionOfCandies}','${obj.numberOfCandies}')">BuyOne</button>
    <button id="buyTwoCandie" onclick="buyTwoCandie('${obj._id}','${obj.name}','${obj.descriptionOfCandies}','${obj.numberOfCandies}')">BuyTwo</button>
    <button id="buyThreeCandie" onclick="buyThreeCandie('${obj._id}','${obj.name}','${obj.descriptionOfCandies}','${obj.numberOfCandies}')">BuyThree</button>
    <button id="deleteCandies" onclick="deleteCandies('${obj._id}')">Delete</button>
  </li>`
    candieList.innerHTML = candieList.innerHTML + childNode;

}

//REMOVING FROM THE SCREEN
function removeNodeFromScreen(objId) {
    let child = document.getElementById(objId)
    candieList.removeChild(child)
}

//DELETING FROM SERVER
function deleteCandies(objId) {
    axios.delete(`https://crudcrud.com/api/34f47b5dd2204e418567a955b0066436/candieDetails/${objId}`).then(() => {
        removeNodeFromScreen(objId)
    })
}