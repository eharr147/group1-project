
export interface IRecipe {

    name:             string;

    description:      string;

    cuisine:          string;

    usage:            string;

    effort_lvl?:       string;

    contributor:      string;

    servings?:         number;

    calories?:         number;

    ingredients:      IIngredient[];

    steps:            string[];

}

 

export interface IIngredient {

    quantity: number;

    unit:     string;

    name:     string;

}