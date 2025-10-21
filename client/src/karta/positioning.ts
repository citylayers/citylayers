/**
 * Position class for managing geolocation
 * Stores and updates current latitude/longitude coordinates
 */
class Position {
    static lat: number = 48.210033;
    static lon: number = 16.363449;

    /**
     * Request user's current geolocation
     * Updates Position.lat and Position.lon on success
     */
    static make(): void {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos: GeolocationPosition) => {
                    Position.lat = pos.coords.latitude;
                    Position.lon = pos.coords.longitude;
                    console.log(`Latitude: ${pos.coords.latitude}`);
                },
                (error: GeolocationPositionError) => {
                    console.log(error);
                    if (error.code === error.PERMISSION_DENIED) {
                        alert("You need to allow your location in order to continue");
                    }
                }
            );
        }
    }

    /**
     * Manually update position coordinates
     * @param lat - Latitude coordinate
     * @param lon - Longitude coordinate
     */
    static update(lat: number, lon: number): void {
        Position.lat = lat;
        Position.lon = lon;
        console.log(`Updated to: Latitude: ${lat} Longitude: ${lon}`);
    }
}
