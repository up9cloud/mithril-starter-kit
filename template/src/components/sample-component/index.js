export default function () {
  var count = 0 // added a variable

  return {
    view: function () {
      return m('main', [
        m('button', {
          onclick: function () {
            count++
          }
        }, count + ' clicks')
      ])
    }
  }
}
