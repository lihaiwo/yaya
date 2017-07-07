/* implements selecting webviews, switching between them, and creating new ones. */

var webviewBase = document.getElementById('webviews')

function getWebview (id) {
  return document.querySelector('webview[data-tab="{id}"]'.replace('{id}', id))
}