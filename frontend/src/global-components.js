
import ExportButton from './components/ExportButton.vue';
import NavigationTabs from './components/NavigationTabs.vue';
import BaseCard from './components/BaseCard.vue';

export default function registerGlobalComponents(app){
    app.component('export-button', ExportButton);
    app.component('navigation-tabs', NavigationTabs);
    app.component('base-card',BaseCard);
}