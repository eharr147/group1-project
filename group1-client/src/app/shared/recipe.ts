// recipe.ts = Interface for Recipe object

export interface IRecipe {
    _id:              any;
    name:             string;
    description:      string;
    cuisine:          string;
    meal:             string;
    usage:            string;
    keywords?:         string[];
    effort_lvl?:       string;
    prep_time?:        number;
    contributor:      string;
    allergies?:        string[];
    servings:         number;
    calories?:         number;
    sugar_lvl?:        string;
    main_ingredients: string[];
    ingredients:      IIngredient[];
    steps:            string[];
}

export interface IIngredient {
    quantity: number | string;
    unit:     string;
    name:     string;
}