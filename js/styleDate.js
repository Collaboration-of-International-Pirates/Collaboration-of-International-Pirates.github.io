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
    // Praite days
    { "title": "World Day Against Cyber Censorship", "day": 12, "month": 2, "class": "world-day-against-cyber-censorship" },
    { "title": "Chelsea Manning", "day": 17, "month": 11, "class": "chelsea-manning" },
    { "title": "Aaron swartz", "day": 8, "month": 11, "class": "aaron-swartz" },
    { "title": "Edward Snowden", "day": 21, "month": 5, "class": "edward-snowden" },
    { "title": "Julian Assange", "day": 3, "month": 6, "class": "julian-assange" },
    { "title": "Public Domain Day", "day": 1, "month": 0, "class": "public-domain-day" },
    // other
    { "title": "International women's day", "day": 8, "month": 2, "class": "woman-day" },
    { "title": "420", "day": 20, "month": 3, "class": "four-twenty" },

]

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const dayOfWeek = today.getDay();
const firstDayOfMonth = new Date(today.getFullYear(), month, 1);
const lastDayOfMonth = new Date(today.getFullYear(), month + 1, 0);

for (let i = 0; i < styleDate.length; i++) {
    if (styleDate[i].dayOfWeek !== undefined) {
        // Check if it's the correct day of the week in the correct week
        const targetDate = new Date(today.getFullYear(), month, 1 + styleDate[i].dayOfWeek - firstDayOfMonth.getDay() + (styleDate[i].week - 1) * 7);
        if (targetDate.getMonth() === month && targetDate.getDate() === day) {
            document.body.classList.add(styleDate[i].class);
        }
    } else if (styleDate[i].day && styleDate[i].month) {
        if (styleDate[i].day === day && styleDate[i].month === month) {
            document.body.classList.add(styleDate[i].class);
        }
    } else if (styleDate[i].month) {
        if (styleDate[i].month === month) {
            document.body.classList.add(styleDate[i].class);
        }
    }
}