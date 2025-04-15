const inputBox = document.querySelector('#input-box');
const listContainer = document.querySelector('#listcontainer');

document.querySelector('.addButton').addEventListener('click', addTask);
document.addEventListener('keydown', (e) =>
{
    if(e.key === "Enter")
    {
        addTask();
    }
});


(function Init()
{
    loadData();
})();

function addTask()
{
    if(inputBox.value === '')
    {
        alert('Please enter a valid task');
    }
    else
    {
        console.log(inputBox.value);
        let li  = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        //cross btn
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        inputBox.value = "";
        saveData();
    }
}


listContainer.addEventListener('click', function(e)
{
    if(e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
    }

    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }

    saveData();
},false);



//Storing tasks in browser
function saveData()
{
    localStorage.setItem("data", listContainer.innerHTML);
}

function loadData()
{
    listContainer.innerHTML = localStorage.getItem("data");
}



//rearranging task order

