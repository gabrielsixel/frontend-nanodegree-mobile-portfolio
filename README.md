## Website Performance Optimization portfolio project

The challenge as to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make the page render as quickly as possible by applying the techniques I picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository and inspect the code.

### Getting started

#### Run the simple Server

1. Check out the repository
1. Run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to the top-level of your project directory to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ./ngrok http 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights!

#### Re-running the minification.

This project uses Grunt to minify HTML, CSS and JavaScript, and to inline the css on the HTML, JS was not inline do to better performance as async.

To run a minification just run:
  ```bash
  $> sudo grunt
  ```

#### Performance optimization

1. All animations with a requestAnimationFrame
1. Change all the document query's from inside a loop to outside (when applicable)
1. Decrease the amount of animated elements, since not all elements are showing
