$.cofirm = function(options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title: options.title,
      closable: false,
      width: '20%',
      content: options.content,
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {text: 'Отменить', type: 'secondary', handler() {
          modal.close()
          reject()
        }},
        {text: 'Удалить', type: 'danger', handler() {
          modal.close()
          resolve()
        }}
      ]
    })
    setTimeout(() => modal.open(), 100)
    
  })
}