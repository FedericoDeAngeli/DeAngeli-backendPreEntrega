function getProducts() {
    fetch("/api/productos"
        .then(resp => resp.json())
        .then(data => {
            const targetDOM = document.getElementById('producto')
            targetDOM.addEventListener('click', addProduct)
            targetDOM.innerHTML = ''
            for (el of data.payload) {
                const newElement = document.createElement('tr')
                newElement.innerHTML = `
                <th scope="row">${el.title}</th>
                <td>${el.description}</td>
                <td>${el.category}</td>
                <td style="text-align: right">${el.price}</td>
                <td style="text-align: right">${el.stock}</td>
                <td style="text-align: center">
                <button type="button" class="btn btn-success" id="${el._id}">add</button>
                </td>
                `
                targetDOM.appendChild(newElement)
            }}))}