import { BaseComponent } from '../component/BaseComponent';
import { ClassName, CLASSNAMES } from '../../constants/ClassNames';

/**
 * Top Tag Panel / Geocoding Panel
 * Migrated from topTagPanel.js to TypeScript with BaseComponent pattern
 */

/**
 * Panel for displaying geocoding information based on user location
 */
export class TopTagPanel extends BaseComponent {
    protected elements: any[];

    constructor(parent: string) {
        super(parent || "body", ClassName.GEOCODING_PANEL, "geocodingpanelid");
        this.content = "";
        this.elements = [];
    }

    /**
     * Get parent element (handles class name parent selector)
     */
    public getParent(): HTMLElement | null {
        const elements = document.getElementsByClassName(this.parentId);
        if (elements.length > 0) {
            return elements[0] as HTMLElement;
        }
        return super.getParent();
    }

    /**
     * Generate OpenStreetMap Nominatim reverse geocoding URL
     */
    static getUrl(lat: number, lon: number): string {
        return `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2&zoom=12`;
    }

    protected createElement(): HTMLElement {
        const element = super.createElement();
        element.innerHTML = this.content;
        return element;
    }

    /**
     * Load geocoding data using browser geolocation API
     */
    load(): void {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._call.bind(this),
                this._error.bind(this)
            );
        } else {
            console.log("Geoposition undefined");
        }
    }

    /**
     * Error handler for geolocation failure
     */
    private _error(geo: GeolocationPositionError): void {
        console.log(geo);
        console.log("Failed to get position");
    }

    /**
     * Success handler for geolocation - fetch reverse geocoding data
     */
    private _call(geo: GeolocationPosition): Promise<any> {
        const GeocodeParser = (window as any).GeocodeParser;
        const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        let url = TopTagPanel.getUrl(geo.coords.latitude, geo.coords.longitude);

        return fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then(result => {
            if (result.status === 200) {
                return result.json().then(res => {
                    const panels = document.getElementsByClassName(ClassName.GEOCODING_PANEL);
                    if (panels.length > 0 && GeocodeParser) {
                        (panels[0] as HTMLElement).innerHTML = GeocodeParser.run(res);
                    }
                    return res;
                });
            }
            else if (result.status === 429) {
                return sleep(1000).then(() => this._call(geo));
            }
            else if (result.status === 504) {
                return this._call(geo);
            }
            else {
                console.log(`CODE: ${result.status}`);
            }
            return result;
        });
    }
}
