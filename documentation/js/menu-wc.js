'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">dormitory-management-system-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ApartmentsModule.html" data-type="entity-link" >ApartmentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' : 'data-bs-target="#xs-controllers-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' :
                                            'id="xs-controllers-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' }>
                                            <li class="link">
                                                <a href="controllers/ApartmentsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApartmentsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' : 'data-bs-target="#xs-injectables-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' :
                                        'id="xs-injectables-links-module-ApartmentsModule-d3156e887e5ab14306c530a6ad30fba83d3718bf76854ef162e27727acf8cfd1c1e19ea9b2370c3b726f6a699facb1a57849ab55779801db2781d751cf4460dd"' }>
                                        <li class="link">
                                            <a href="injectables/ApartmentsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApartmentsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ReservationsModule.html" data-type="entity-link" >ReservationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' : 'data-bs-target="#xs-controllers-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' :
                                            'id="xs-controllers-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' }>
                                            <li class="link">
                                                <a href="controllers/ReservationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' : 'data-bs-target="#xs-injectables-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' :
                                        'id="xs-injectables-links-module-ReservationsModule-f792d6d66ae9865b4e507bae605466c396ebf912329c937dde740f9ed5fc789a275fe28e2459ec3ccfebe5ff0ab0cc7f252b52adb72c8252f03f5fa0b1250f52"' }>
                                        <li class="link">
                                            <a href="injectables/ReservationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReservationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' :
                                            'id="xs-controllers-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' :
                                        'id="xs-injectables-links-module-UsersModule-b305076d28405aee9d979ae56adc816868dd8d94cf40610c8b455bdd58195fae6d09eaa851519db55abcf18aa01fd79e4fd1649d8f7e9bb78300a600bd8b4c3e"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateApartmentDto.html" data-type="entity-link" >CreateApartmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateReservationDto.html" data-type="entity-link" >CreateReservationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});