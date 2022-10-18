# UKM SPA (Single Page Aplication)

Less mer om SPA: https://developer.mozilla.org/en-US/docs/Glossary/SPA


![alt text](https://github.com/UKMNorge/ukm-onepage-js/blob/main/docs/diagram-ukm-one-page.png?raw=true)


`UKMOnePage` representerer rammeverket og kan ikke initialiseres, derfor må en klasse som utvider det må opprettes.


`ProjectOnePage` - representerer en mer spesifikk implementasjon av rammeverket som passer for et prosjekt eller en side

## EventElement
representerer et DOM element som har et event og attributer som passer for det elementet.

```js
deltaOnePage.addEventElements([
   new EventElement('.card-body-arrangement.meldpaa', 'click', ()=>{ console.log("callback"); }, 'get_innslag_types', 'GET', ['pl_id'])        
]);
```


## Director
Director klasse brukes for å navigere gjennom sider som er definert i DOM som sider for å oppnå SPA metodologien.

```html
<div id="pageTestHello">
	<h1>Page content here...</h1>
</div>
```

```js
Director.openPage("pageTestHello");
```

Director kan brukes for å legge til attributer på URL og hente dem når det trengs.


## SPAInteraction

Brukes til å skape interaksjon i brukergrensesnittet, sende meldinger og mest viktig kjøre API kall.

```js
var innslag = await this.spaInteraction.runAjaxCall('get_innslag/'+this.innslag_id, 'GET', {});

```

```js
this.spaInteraction.showDialog('Vil du melde av?', 'Vil du virkelig slette dette innslaget?', buttons);
```
