# Cabassa's Project 2: ACNH Critterpedia

My [critterpedia](https://decritterpedia.herokuapp.com), hosted on Heroku.

## Planning
As part of our classwork on the Friday before project week we were instructed to begin planning out our project. I spent some time with one of my cohort's IAs (Adam) discussing my project idea and limited ERD and wireframes. I decided that this would be my planning checklist (for my first sprint over the following weekend):
* Clone the authorization boilerplate code we made together in class and push it into this newly-created repo. ✅
* Plan out and begin this readme ✅
* Create models needed for the project✅
* Create and use apiTest.js to write test calls for my chosen [API](https://acnhapi.com/v1/) ✅

## Materialize
Adding Materialize to my project was important to do early in development because it effects the syntax of all I add to each view. While normally easy to implement, getting the navbar up top to be fully page-size responsive turned out to be a bit of a pain. This irritation was finally resolved when I was reminded to add a particular script to the bottom of my layout.ejs body:
```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
    });
</script>  
```

## Installation
1. You'll want to fork and clone [this repo](https://github.com/decpdx584/critterpedia).
2. Install all node modules in the file:
```bash
npm install
```
3. If you don't already have/use sequelize, install it globally:
```bash
npm install -g sequelize-cli
```
4. Then initialize the project with sequelize:
```bash
sequelize init
```
5. Open the project in your text editor and open the newly-created config.json file.
    * it needs to be configured thus:
```javascript
    {
  "development": {
    "database": "decritterpedia",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "decritterpedia",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "decritterpedia",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```
6. Create the database:
```bash
sequelize db:create decritterpedia;
```
7. Create the appropriate models:
```bash
sequelize model:create --name user --attributes name:string,email:string,password:string;
sequelize model:create --name critter --attributes type:string,name:string;
sequelize model:create --name belongTos --attributes userId:integer,critterId:integer, nickname:string;
```
8. Open the newly-created models in the text editor and write in the following associations:
* in **user**:
```javascript
static associate(models) {
      // define association here
models.user.belongsToMany(models.critter, { through: 'belongTos', onDelete: 'CASCADE'});
```
* in **critter**:
```javascript
static associate(models) {
      // define association here
models.critter.belongsToMany(models.user, { through: 'belongTos', onDelete: 'CASCADE'});
```
9. Now that your database and models are created, it's time to seed the critter data into your critter table. This only needs to happen once. I've already written the script for you; you just need to run it.
From the project's root folder in your terminal, run the following command:
```bash
node apiTest.js
```
10. You're ready to run this application locally! Either run:
```bash
node server.js
```
...or, if you have ***nodemon*** installed globally as I do, just run: 
```bash
nodemon
```
... to get the server running. 
*Then, just open a browser window to **localhost:3000** and happy critter-ing!

## Usage
* If you just want to search for critters in the game Animal Crossing: New Horizons, just type the animal name in the provided search bar on the index (first) screen and hit enter/return.

* Once you find an animal a photo card with its name will pop up. You can click the photo to see information on the creature, such as its habitat, rarity, price fetched if sold at Nook's Cranny, and even Blathers' spiel upon donation at the museum.

* You'll notice a button on the animal's photo card that ssays "Add to Inventory". That's a feature that's available only if you sign up for the app. If you click on the button it will lead you to the login page, where you enter your email and password with which you signed up. If you haven't signed up yet, you'll want to do so by clicking on the Signup button in the menubar at the top of the page.

* Once you're signed-up/logged-in you'll be led back to the search page. From there you can continue searching for critters to add to your personal inventory. Or you can go straight to see your inventory by clicking the link under the search or the Inventory button at the op of the page.

* Upon gazing at your inventory, you'll notice each entry has its name and a couple of buttons surrounding a text input. The red "eject" button will remove the critter from your inventory. The text input is for you to give your critter a nickname. You can either enter/return the typed nickname or you can dub the critter by clicking the green "edit" button. If you want to change the neckname at any point you can do so simply by typing and entering in another name in the text input. If you don't want it to have one at all you can just click the cursor into the text input and hit enter/return.

## Technology
* One thing I was quite proud of during the development of this project was the fact that I wrote a controller and 3 routes to be used only once, to seed the Heroku database upon deployment. I commented out the use of the controller in server.js afterward so the routes aren't happened-upon accidently by a user. I was so proud because the day we deployed on Heroku I had no idea how I'd accomplish this task again and it took a while for me to understand what my IAs were suggesting I do. Once I finally got it, however, I wrote out these routes:
```javascript
// SEED FISH
router.get('/ed/fi/sh', (req,res) => {
    axios.get('https://acnhapi.com/v1a/fish')
    .then(response => {
        let fish = response.data
        fish.forEach(f => {
            db.critter.findOrCreate({
                where: {
                    type: 'fish',
                    name: f['file-name']
                }
            }).catch(err => {
                console.log('Error', err)
            });
        });
    }).catch(err => {
        console.log('Error', err)
    });
  });
```
... (two others for bugs and for sea creatures) AND THEY WORKED THE FIRST TIME I RAN THEM. It was the first time in the entire development that a script I'd written worked exactly as intended immediately. I've learned I need to take these victories where I can get them.

* A word about Materialize: I'm quite grateful to the framework for allowing my app to look as though it's slightly newer than a MySpace page. However, I'm DEFINTELY still learning how to use it and I know with time and practice I will be able to make this app look MUCH more professional. My favorite thing I made with the framework so far is the card on my detail.ejs. In particular, I like the JavaScript I was able to inject into the HTML:
```html
 <div class="card-reveal">
      <span class="card-title grey-text text-darken-4"><%= results['file-name'].replace(/_/g, " ").toUpperCase() %><i class="material-icons right">close</i></span>
      <% if (critter1.type == 'sea') { %>
        <h5><span class="flow-text">Habitat: Shallow sea</span></h5>
      <% } else { %>
        <h5><span class="flow-text">Habitat: <%= results.availability.location %></span></h5>
      <% }; %>
      <% if (critter1.type == 'sea') { %>
        <h5><span class="flow-text">Shadow size: <%= results.shadow %></span></h5>
        <h5><span class="flow-text">Speed: <%= results.speed %></span></h5>
      <% } else { %>
        <h5><span class="flow-text">Rarity: <%= results.availability.rarity %></span></h5>
      <% }; %>
      <h5><span class="flow-text">Sale price: <%= results.price%> bells</span></h5>
      <h5><span class="flow-text">When you caught it you said,<br>"<%= results['catch-phrase'] %>"</span></h5>
      <h5><span class="flow-text">When you donate it to the museum, Blathers says:<br>"<%= results['museum-phrase'] %>"</span></h5>
    </div>
  </div>
```
The reason for those conditinals is that the [API](https://acnhapi.com/) with which I worked lays out the critter object data slightly differently between sea creatures than it does with fish or bugs. Luckily, though, this API requires no key (as of 8/2020) for use and has been quite reliable so far! I plan to make a donation to it as a) I've used it quite a bit during development and b) I plan to use it even more when I continue building this app out.

## Stretch Goals
There are a few things I'd like to get done on this project when I have time:
1. I'd like the search to be a little more intuitive by recognizing partial matches. So, if you type in "butterfly" you get all the butterflies in the game to look at and learn about.
2. Along the same lines, I also want to be able to display entire sections of critters, like to click a fish button and see all the fish in the game.
3. I'd like to add the pocket icon (an abbreviated picture of each critter) to the inventory page. I fear I'll need to addd the attribute to my belongTos model to do so.
4. The API also has all the music from the game and, so, I'd like to add a jukebox to the app that will either play random KK Slider songs or (ideally) allow the user to play whatever song they want to.

## Conclusion
These stretch goals will all be done because I want to use this app when I'm done with this course and I have time to play Animal Crossing again!