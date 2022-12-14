const allDataTable = document.getElementById("allDataTable")
const getData = document.getElementById("getData")
const deleteData = document.getElementById("deleteData")


$(function GetData() {
    async function Info() {
        let array = await axios(`https://northwind.vercel.app/api/products`).then((res) => {
            return res.data
        })
        RenderData(array)
    }

    $("#getData").click(function () {
        Info()
    })
})

$(function DeleteData() {
    async function DeleteInfo(val = "") {
        if (val == "") {
            val.trim()
        }
        else {
            let array = await axios.delete(`https://northwind.vercel.app/api/products/${val}`).then((res) => {
                return res.data
            })
            RenderData(array)
        }

    }
    $("#deleteData").click(function () {
        $("#idInp").show(1000)
        $("#idInp").val("")

        $("#unitInp").hide(500)
        $("#name").hide(500)
        $("#unitinstockInp").hide(500)
        $("#quantityInp").hide(500)
        let val = $("#idInp").val()
        DeleteInfo(val)
    })
})

$(function AddData() {
    async function AddInfo(id, name, uPrice, uStock, qUnit) {
        if (id == "") {
            return
        }
        let array = await axios.post(`https://northwind.vercel.app/api/products`, {
            id: `${id}`,
            name: `${name}`,
            unitPrice: `${uPrice}`,
            unitsInStock: `${uStock}`,
            quantityPerUnit: `${qUnit}`
        }).then((res) => {
            return res.data
        })
        RenderData(array)


    }
    $("#addData").click(function () {
        $("#idInp").show(1000)
        $("#name").show(1000)
        $("#unitInp").show(1000)
        $("#unitinstockInp").show(1000)
        $("#quantityInp").show(1000)

        let id = $("#idInp").val()
        let name = $("#name").val()
        let unitInp = $("#unitInp").val()
        let unitinstockInp = $("#unitinstockInp").val()
        let quantityInp = $("#quantityInp").val()
        $("#idInp").val("")
        $("#name").val("")
        $("#unitInp").val("")
        $("#unitinstockInp").val("")
        $("#quantityInp").val("")
        AddInfo(id, name, unitInp, unitinstockInp, quantityInp)
    })
})




function RenderData(array) {

    for (let i = 0; i < array.length; i++) {
        allDataTable.innerHTML += `
        <tr>
            <td>${array[i].id}</td>
            <td>${array[i].name}</td>
            <td>${array[i].unitPrice}</td>
            <td>${array[i].unitsInStock}</td>
            <td>${array[i].quantityPerUnit}</td>
            </tr>
        `
    }
}

