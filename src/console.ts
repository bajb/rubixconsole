import Alpine from 'alpinejs'
import {on} from '@packaged-ui/fusion/src/Foundation/res/events.js'

import './console.scss';


Alpine.start();

on(document, 'click', 'h1', (e) => {
    console.log(e)
})
