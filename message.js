class Message {
  constructor(options) {
    const defaultOption = {
      message: '',
      type: 'success',
      duration: 5000
    }
    this.options = Object.assign(defaultOption, options)

    if (!document.getElementById('messageParent')) {
      this.messageParent = document.createElement('div')
    } else {
      this.messageParent = document.getElementById('messageParent')
    }

    this.messageBox = document.createElement('div')
    this.messageInfo = document.createElement('div')
    this.closeBtn = document.createElement('b')
    this.bindEvent()

    this.timer = setTimeout(() => {
      this.hide()
      clearTimeout(this.timer)
    }, this.options.duration)

  }
  show () {
    this.init()
    this.mount()
  }
  hide () {
    this.messageParent.removeChild(this.messageBox)
    clearTimeout(this.timer)

    this.checkHasMessageList() ? false : document.body.removeChild(this.messageParent)
  }

  checkHasMessageList () {
    const messageList = [...document.querySelectorAll('.message')]
    if (messageList.length < 1) {
      return false
    } else {
      return true
    }
  }

  bindEvent () {
    this.closeBtn.addEventListener('click', this.hide.bind(this))
  }

  init () {
    const messageParentStyle = {
      position: 'fixed',
      left: '50%',
      top: 0
    }

    for (let key in messageParentStyle) {
      this.messageParent.style[key] = messageParentStyle[key]
    }

    this.messageParent.id = 'messageParent'
    this.closeBtn.innerHTML = 'X'
    this.messageInfo.innerHTML = this.options.message

    this.closeBtn.style.cursor = 'pointer'
    this.closeBtn.style.marginLeft = '10px'


    const messageBoxStyle = {
      width: '400px',
      margin: '0 0 10px -200px',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      border: '1px solid #e0e0e0',
      color: this.options.type === 'success' ? 'rgb(100, 194, 70)' : 'rgb(247, 108, 109)',
      backgroundColor: this.options.type === 'success' ? 'rgb(240, 249, 235)' : 'rgb(254, 240, 240)',
      borderRadius: '5px'
    }

    this.messageBox.className = 'message'

    for (let key in messageBoxStyle) {
      this.messageBox.style[key] = messageBoxStyle[key]
    }
  }
  mount () {
    this.messageBox.appendChild(this.messageInfo)
    this.messageBox.appendChild(this.closeBtn)
    document.body.appendChild(this.messageParent)
    this.messageParent.appendChild(this.messageBox)
  }
}


//导出创建消息提示框的方法
function createMessage (options = {}) {
  const message = new Message(options)
  message.show()
  return message
}
