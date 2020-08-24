# Cabassa's Project 2: ACNH Critterpedia

My [critterpedia](decritterpedia.herokuapp.com), hosted on Heroku.

## Planning
As part of our classwork on the Friday before project week we were instructed to begin planning out our project. I spent some time with one of my cohort's IAs (Adam) discussing my project idea and limited ERD and wireframes. I decided that this would be my planning checklist (for my first sprint over the following weekend):
* Clone the authorization boilerplate code we made together in class and push it into this newly-created repo. ✅
* Plan out and begin this readme ✅
* Create models needed for the project✅
* Create and use apiTest.js to write test calls for my chosen [API](https://acnhapi.com/v1/) ✅

## Materialize
Adding Materialize to my project was important to do early in development because it effects the syntax of all the I add to each view. While normally easy to implement, getting the navbar up top to be fully page-size responsive turned out to be a bit of a pain. This irritation was finally resolved when I was reminded to add a particular script to the bottom of my layout.ejs body:
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