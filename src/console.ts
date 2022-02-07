import Alpine from 'alpinejs'
import './console.scss';
import CompanionApp from "./Alpine/companionApp";

window.addEventListener('alpine:init', function () {
    Alpine.data('companionApp', CompanionApp);

});

Alpine.start();
