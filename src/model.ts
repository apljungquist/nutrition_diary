import {List} from 'immutable';


export interface Food {
    id: string,
    name: string,
    quantity: number,
    unit: string,
    energy: number,
    fat: number,
    carbohydrates: number,
    protein: number,
}

export const sample_foods = List([
    {
        id: "food-0",
        name: "salmon",
        quantity: 125,
        unit: "g",
        energy: 1.25604E+03,
        fat: 0.6,
        carbohydrates: 21.2,
        protein: 28.8,
    },
    {
        id: "food-1",
        name: "rocket",
        quantity: 20,
        unit: "g",
        energy: 2.51208E+01,
        fat: 0.4,
        carbohydrates: 0.0,
        protein: 0.5,
    },
    {
        id: "food-2",
        name: "egg",
        quantity: 2,
        unit: "pcs",
        energy: 5.98712E+02,
        fat: 0.7,
        carbohydrates: 9.5,
        protein: 12.8,
    },
    {
        id: "food-3",
        name: "bacon",
        quantity: 100,
        unit: "g",
        energy: 1.1723E+03,
        fat: 1.0,
        carbohydrates: 24.0,
        protein: 16.0,
    },
]);

