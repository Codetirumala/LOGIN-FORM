const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const port = 3001;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, './templates');
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "hbs");
app.set("views", templatePath);

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password
        };
        await collection.insertMany([data]);
        res.redirect("/home");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Error during signup.");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name, password: req.body.password });
        if (user) {
            res.redirect("/home");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login.");
    }
});

app.get("/home", (req, res) => {
    res.render("home");
});
