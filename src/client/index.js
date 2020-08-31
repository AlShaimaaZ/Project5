import { handelSubmit } from "./js/app";
//Event Listener to show resulsts

import './styles/Style.scss'
import './styles/Mobile.scss'
document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.continue').addEventListener('click', handelSubmit);
});
export {
    handelSubmit
}