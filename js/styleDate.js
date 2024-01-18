const styleDate = [
    // days LGBNTQ+ community celebrates
    { "title": "Agender Pride Day", "month": 0, "day": 8, "class": "agender-pride" },
    { "title": "Aromantic Visibility Day", "month": 1, "day": 21, "class": "aromantic-visibility" },
    { "title": "International Asexuality Day", "month": 3, "day": 6, "class": "international-asexuality" },
    { "title": "Celebrate Bisexuality Day", "month": 8, "day": 23, "class": "celebrate-bisexuality" },
    { "title": "Drag Day", "month": 6, "day": 16, "class": "drag-day" },
    { "title": "International Day Against Homophobia, Transphobia and Biphobia", "month": 4, "day": 17, "class": "international-day-against-homophobia" },
    { "title": "Intersex Awareness Day", "month": 9, "day": 26, "class": "intersex-awareness" },
    { "title": "Intersex Day of Remembrance", "month": 11, "day": 8, "class": "intersex-day-of-remembrance" },
    { "title": "Lesbian Day", "month": 9, "day": 8, "class": "lesbian-day" },
    { "title": "Lesbian Visibility Day", "month": 3, "day": 26, "class": "lesbian-visibility" },
    { "title": "National Coming Out Day", "month": 9, "day": 11, "class": "national-coming-out-day" },
    { "title": "Non-Binary People's Day", "month": 6, "day": 14, "class": "non-binary-people" },
    { "title": "Pansexual & Panromantic Awareness Day", "month": 4, "day": 24, "class": "pansexual-panromantic-awareness" },
    { "title": "Transgender Day of Remembrance", "month": 10, "day": 20, "class": "transgender-day-of-remembrance" },
    { "title": "Trans Day of Visibility", "month": 2, "day": 31, "class": "trans-day-of-visibility" },
    { "title": "Zero Discrimination Day", "month": 2, "day": 1, "class": "zero-discrimination" },
    // Months LGBNTQ+ community celebrates
    { "title": "Trans Awareness Month", "month": 9, "class": "trans-awareness" },
    { "title": "Trans Parent Day", "DayOfWeek": 0, "month": 10, "week": 1, "class": "trans-parent" },
    { "title": "International Pronouns Day", "DayOfWeek": 3, "month": 9, "week": 3, "class": "international-pronouns" },
    { "title": "International Day of Pink", "DayOfWeek": 3, "month": 3, "week": 2, "class": "international-day-of-pink" },
    { "title": "Asexual Awareness Week", "month": 9, "week": -1, "class": "asexual-awareness-week" },
    // PP
    { "title": "World Day Against Cyber Censorship", "day": 12, "month": 2, "class": "world-day-against-cyber-censorship" },
    { "title": "Chelsea Manning", "day": 17, "month": 11, "class": "chelsea-manning" },
    { "title": "Aaron swartz", "day": 8, "month": 11, "class": "aaron-swartz" },
    { "title": "Edward Snowden", "day": 21, "month": 5, "class": "edward-snowden" },
    { "title": "Julian Assange", "day": 3, "month": 6, "class": "julian-assange" },
    { "title": "420", "day": 20, "month": 3, "class": "four-twenty" },
    // other
    { "title": "International women's day", "day": 8, "month": 2, "class": "woman-day" }
]

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const dayOfWeek = today.getDay();
const firstDayOfMonth = new Date(today.getFullYear(), month, 1);
const firstDayOfWeek = firstDayOfMonth.getDay();
const lastDayOfMonth = new Date(today.getFullYear(), month + 1, 0);
const lastDayOfWeek = lastDayOfMonth.getDay();


for (let i = 0; i < styledate.length; i++) {
    // day of week
    if (styledate[i].DayOfWeek) {
        if (styledate[i].DayOfWeek === dayOfWeek && styledate[i].month === month) {
            // set body class
            document.body.classList.add(styledate[i].class);
        }
    }
    // if it has day then it will have month
    else if (styledate[i].day && styledate[i].month) {
        if (styledate[i].day === day && styledate[i].month === month) {
            document.body.classList.add(styledate[i].class);
        }
    }
    // if it only has month
    else if (styledate[i].month) {
        if (styledate[i].month === month) {
            document.body.classList.add(styledate[i].class);
        }
    }

}