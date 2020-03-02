var dataInput = document.getElementById("dataInput");
var ev_add = document.getElementById("click");
var ev_del = document.getElementById("delete");

function getData(){
    return axios({
        method : 'get',
        url: 'http://localhost:9080/lesson'
    })
}

function setData(items){
    return axios({
        method : 'post',
        url: 'http://localhost:9080/lesson',
        data : {
            content : items
        } 
    })
}

function render(data){
    var items = data.map(function(value){
        return "<li>" + value.content + "</li>";
    });
    document.getElementById("out").innerHTML = items.join('');
}



async function addData(){
    await setData(dataInput.value);
    await getData().then(function(respone){
        console.log(respone.data);
        render(respone.data);
        dataInput.value = "";
    })
}

function delete_Data(){
    return axios({
        method: 'delete',
        url: 'http://localhost:9080/lesson/' + dataInput.value,
    });
}

async function deleteData() {
    await delete_Data();
    await getData().then(function (respone) {
        console.log(respone.data);
        render(respone.data);
        dataInput.value = "";
    })
}

getData().then(function (respone) {
    render(respone.data);
})

ev_add.addEventListener("click", addData);
ev_del.addEventListener('click', deleteData);