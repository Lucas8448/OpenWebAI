"use server"

export function getPrecipationMap() {
    return fetch('https://api.met.no/weatherapi/radar/2.0/?area=southeastern_norway&content=animation&type=5level_reflectivity');
}