let smartphones = [
  {id: 1, title: 'Honor 20 Pro 256Gb', price: 29990, img: 'img/honor20.jpg'},
  {id: 2, title: 'Samsung Galaxy A30s 32GB', price: 10990, img: 'img/galaxya30.jpg'},
  {id: 3, title: 'Redmi Note 8T 64GB', price: 15990, img: 'img/redminote8t.jpg'}
]

const toHTML = smartphone => `
  <div class="card" >
    <img src="${smartphone.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${smartphone.title}</h5>
      <a href="#" class="btn btn-primary" data-btn="price" data-id="${smartphone.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-btn="remove" data-id="${smartphone.id}">Удалить</a>
    </div>
  </div>
`

function render() {
  const html = smartphones.map(toHTML).join('')
  document.querySelector('.content').innerHTML = html
}

render()

const modal = $.modal({
  title: 'Цена на товар',
  closable: true,
  width: '20%',
  footerButtons: [
    {text: 'Закрыть', type: 'primary', handler() {
      modal.close()
    }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const smartphone = smartphones.find(s => s.id === id)
  if( btnType === 'price'){
  modal.setContent(`<p>Цена на ${smartphone.title}: <strong>${smartphone.price} р.</strong></p>`)
  modal.open()
  }
  else if(btnType === 'remove') {
    $.cofirm({
      title: `Вы уверены?`,
      content: `Вы хотите удалить запись: ${smartphone.title}`
    }).then(() => {
      smartphones = smartphones.filter(s => s.id !== id)
      render()
    }).catch(() => {
    })
    // confirmModal.setContent(`
    // <p>Вы удаляете запись: ${smartphone.title}</strong></p>
    // `)
    // confirmModal.open()
  }
})