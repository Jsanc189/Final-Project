import foodData from './food.json';

class ingredientGroup {
    constructor(...foods) { // call it like "new ingredientGroup('cheese', 'bacon')"
        this.group = [...foods]; // list of foods in group
    }

    /**
     * adds food to group, combining with every object if possible
     * @param {String} food 
     */
    addToGroup(food) {
        let dirty = false; // check merge
        for (const item in this.group) {
            // find lexicographic order
            let first, second;
            if (item < food) {
                first = item;
                second = food;
            } else {
                first = food;
                second = item;
            }

            // merge
            if (foodData[first].plus[second]) {
                this.group.splice(this.group.indexOf(item), 1, foodData[first].plus[second]);
                dirty = true;
            }
        }
        if (!dirty) {
            this.group.push(food);
        }
    }

    /**
     * return the list of foods
     * @return {Array} list of foods currently in group
     */
    getGroup() {
        return this.group;
    }
}