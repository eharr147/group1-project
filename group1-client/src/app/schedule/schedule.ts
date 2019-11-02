// schedule.ts - Interface for Schedule object
// this helps with intellisense, but doesn't appear to be necessary 
export interface ISchedule {
        userId: string;
        mealDate:   Date;
        mealTime:   string;
        mealDishes: IMealDish[];
        mealNotes?:  string[];
    }
    
    export interface IMealDish {
        dishType:    string;
        recipeId:    string;
        recipeTitle: string;
        recipeDesc:  string;
    }
    



