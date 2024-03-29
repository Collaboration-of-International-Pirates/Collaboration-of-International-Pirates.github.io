const ejs = require("gulp-ejs");
const ejsCompiler = require("ejs");
const rename = require("gulp-rename");
const each = require("gulp-each");
const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");
const fsPromises = fs.promises;
const MarkdownIt = require("markdown-it");
const gulp = require("gulp");

// A fix that allows EJS to load files from the file system
let myFileLoader = function (filePath) {
    let data = fs.readFileSync(filePath);
    return data;
};
ejsCompiler.fileLoader = myFileLoader;
const ARTICLES_PER_PAGE = 10
function generateArticleHtmlPages(cb) {
    console.log("generateArticleHtmlPages");
    const md = new MarkdownIt();
    let p = path.join(__dirname, "src/views/articles/show.ejs");
    const indexArticleTemplate = fs.readFileSync(p, "utf-8");
    return gulp
        .src("./src/articles/*.md") // Corrected the glob pattern
        .pipe(each(function (content, file, callback) {
            console.log("file", file);
            const { data, content: markdownContent } = matter(content);
            const htmlContent = md.render(markdownContent);
            const fileHistory = file.history[0];
            const articleSlug = path.basename(fileHistory, path.extname(fileHistory));
            const date = new Date(Date.parse(data.publishDate));

            const renderedPage = ejsCompiler.render(
                indexArticleTemplate,
                {
                    article: {
                        imageUrl: data.imageUrl,
                        imageAlt: data.imageAlt,
                        title: data.title,
                        filename: articleSlug,
                        slug: data.slug,
                        summary: data.summary,
                        tags: data.keywords,
                        name: data.author[0].name,
                        datePublished: new Date(Date.parse(data.publishDate)),
                        htmlContent,
                    },
                },
                {
                    views: [path.join(__dirname, "src/views/")],
                    root: path.join(__dirname, "src/views"),
                }
            );
            callback(null, renderedPage);
        }))
        .pipe(rename({ extname: ".html" }))
        .pipe(gulp.dest("articles"));
}
function generateArticleHtmlList(cb) {
    console.log("generateArticleHtmlList");
    fsPromises.mkdir("articles").catch(() => { });
    const md = new MarkdownIt();
    const articlesPath = path.join(__dirname, "/src/articles");
    const articleFilenames = fs.readdirSync(articlesPath);
    const indexArticlePath = path.join(
        __dirname,
        "src/views/articles/index.ejs"
    );
    const indexArticleContent = fs.readFileSync(indexArticlePath, "utf-8");
    let articleDataList = [];

    // Read each article file, extract metadata, and render Markdown to HTML
    articleFilenames.forEach((filename) => {
        console.log(filename);
        const filePath = path.join(__dirname, `./src/articles/${filename}`);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const htmlContent = md.render(content);
        const articleSlug = filename.slice(0, -3);
        // change the file extension from png,jpeg,gif,apng to webp
        const pageData = {
            convertImagesToWebPImageUrl: data.convertImagesToWebPImageUrl,
            imageUrl: data.imageUrl,
            imageAlt: data.imageAlt,
            title: data.title,
            filename: articleSlug,
            slug: data.slug,
            summary: data.summary,
            tags: data.keywords,
            name: data.author[0].name,
            datePublished: Date.parse(data.publishDate),
            htmlContent,
        };
        articleDataList.push(pageData);
    });
    // Sort articles by datePublished in descending order
    articleDataList.sort((a, b) => b.datePublished - a.datePublished);
    // articleDataList = articleDataList.reverse();
    const totalPages = Math.ceil(articleDataList.length / ARTICLES_PER_PAGE);
    const htmlPagesPromises = [];

    // Generate HTML pages with a subset of articles per page
    for (let page = 0; page < totalPages; page++) {
        const articlesForCurrentPage = articleDataList.slice(
            page * ARTICLES_PER_PAGE,
            (page + 1) * ARTICLES_PER_PAGE
        );

        // Render the EJS template with the article data
        const renderedPage = ejsCompiler.render(
            indexArticleContent,
            {
                articles: articlesForCurrentPage,
                page,
                hasNextPage: page < totalPages - 1,
            },
            {
                views: [path.join(__dirname, "src/views/")],
                root: path.join(__dirname, "src/views"),
            }
        );

        // Write the rendered page to an HTML file
        const htmlFilePath = path.join(
            __dirname,
            "articles",
            `${page}.html`
        );
        const writeHtmlPromise = fs.promises.writeFile(htmlFilePath, renderedPage);
        htmlPagesPromises.push(writeHtmlPromise);
    }

    // Wait for all HTML pages to be written before invoking the callback
    Promise.all(htmlPagesPromises)
        .then(() => cb(null))
        .catch((error) => cb(error));
}


function generatePathsPage(cb) {
    console.log("generatePaths_page");
    
    return gulp.src("src/views/page/*.ejs")
        .pipe(ejs({}, {
            views: [path.join(__dirname, "./src/views")],
            root: path.join(__dirname, "./src/views"),
        }))
        .pipe(rename({ extname: ".html" }))
        .pipe(gulp.dest("."));
}


exports.build = gulp.series(generateArticleHtmlPages, generateArticleHtmlList, generatePathsPage);
