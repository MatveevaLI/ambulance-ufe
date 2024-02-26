import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/icon/icon'
import '@material/web/textfield/filled-text-field'
import '@material/web/select/filled-select'
import '@material/web/select/select-option'
import '@material/web/slider/slider'
import '@material/web/button/filled-button'
import '@material/web/button/filled-tonal-button'
import '@material/web/button/outlined-button'
import '@material/web/divider/divider'
import { registerNavigationApi } from './navigation.js'

export default function() { // or export default async function()
  registerNavigationApi()
  // package initialization code
}