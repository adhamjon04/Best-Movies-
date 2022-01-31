function findElement(selector, element = document) {
    return element.querySelector(selector);

}
const obj = {
    az: (a, b) => {
        if (a.title > b.title) {
            return 1;
        } else if (b.title > a.title) {
            return -1;

        }
        return 0;
    },

    za: (a, b) => {
        if (a.title > b.title) {
            return -1;
        } else if (b.title > a.title) {
            return 1;

        }
        return 0;
    },

    'new-old': (a, b) => {
        return b.year - a.year;
    },
    'old-new': (a, b) => {
        return a.year - b.year;
    },

    'high-low': (a, b) => {
        return b.imdbRating - a.imdbRating;
    },
    'low-high': (a, b) => {
        return a.imdbRating - b.imdbRating;
    }


}