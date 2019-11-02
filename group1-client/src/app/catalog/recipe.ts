// app/catalog/recipe.ts = Interface for Recipe object used in Catalog and Schedule modules
// Includes _id property, which probably will cause trouble in Recipes CRUD
// To avoid problems, let's have two copies of this object (not good practice)
// The other copy is located under app/recipes/recipe.ts

export interface IRecipe {
    _id:              any;
    name:             string;
    description:      string;
    cuisine?:          string;
    usage?:            string;
    effort_lvl?:       string;
    contributor?:      string;
    servings?:         number;
    calories?:         number;
    ingredients?:      IIngredient[];
    steps?:            string[];
}

export interface IIngredient {
    quantity: number;
    unit:     string;
    name:     string;
}