---
title: Building a Top 10 List with D3 and the last.fm API
layout: blog_post
customjs: 
 - //platform.twitter.com/widgets.js
---

My annual top 10 albums list got a little fancier this year.

I'd been playing with [D3](http://d3js.org/) recently and thought it would be interesting to visualize my [last.fm](http://last.fm/user/janiejjones) play count data for the year, and then I though it would be even more interesting to visualize how that compared with my ranking of personal favourites of the year. 

[Here are the results](http://bren.zone/top10) and my musings on data's ability to represent complex systems like my music taste. Below you'll find some more technical details on the build.

<img class="no-border" src="{% asset_path blog/top10chart.gif%}" alt="top 10 albums d3 chart"/>

###Step 1: Get set up

It's been a while since I started a new project from scratch, so I used this as an opportunity to revise my tooling a bit. Working with Node recently had me a bit infatuated with CommonJS and npm as dependency management tools, so I decided to give [Browserify](http://browserify.org/) and [Gulp](http://gulpjs.com/) a try. I am in dev love. 

<blockquote class="twitter-tweet" data-cards="hidden" lang="en"><p>using Browserify &amp; Gulp and it feels so goooood <a href="https://t.co/Fy6wrDZXCA">https://t.co/Fy6wrDZXCA</a></p>&mdash; Brenna O&#39;Brien (@brnnbrn) <a href="https://twitter.com/brnnbrn/status/548963143104606209">December 27, 2014</a></blockquote>

It's easily the cleanest workflow I've had to date. I built a small Gulp and Browserify starter scaffolding, [available on github](https://github.com/brenna/gulp-app-starter), so I can use it ON EVERY PROJECT FOREVER (or until the next cool build tool comes along). It also includes some common build tasks (like Sass compilation and JSHint) and another new favourite, [BrowserSync](http://www.browsersync.io/) for live browser reloading.

###Step 2: Get the data.

Back to the task at hand. In an ideal world, the API you're using gives you exactly the info you want, but unless you're building it yourself, that often isn't the case. 

It was easy enough to pull a listing of my [top albums by play count over the past 12 months](http://www.last.fm/api/show/user.getTopAlbums), but that original list included albums released any year, not just 2014, and there was no way to limit the query further. If I could put Kendrick Lamar's *good kid, m.A.A.d city*(2012) at the top of my list three years in a row, believe me I would, but that's not how this works.

The solution was to get my top albums and then filter out only 2014 releases. Of course, the top albums list didn't include info on release date, so this involved a second call to an [album info endpoint](http://www.last.fm/api/show/album.getInfo) to get the release year for each album in the list. That quickly landed me in async hell, but hey, let's learn another new thing! Promise library, [Q](https://github.com/kriskowal/q) was super helpful in untangling my mess of AJAX requests, allowing me to return a big heap o' promises with all the right data from my [top albums data getting module.](https://github.com/brenna/top-10-albums/blob/master/app/js/topAlbums.js)

I then filtered my albums by release year, keeping only 2014 releases. If you're working in modern browsers (IE9+), I highly recommend using badass array methods like [`.filter()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [`.map()`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). I've been relying more heavily on them lately and find they're often much more intuitive and clearer to read than a standard `for` loop if you don't need an index. Bonus points for chain-abiliy and saying you're a "cool functional programmer" too.

###Step 3: Chart it with D3

So D3 can have a bit of a steep learning curve, but it's soooo much fun once you get into it. The docs can be a bit sparse sometimes, so if you're looking to get started, [tutorials](http://bost.ocks.org/mike/bar/) and examples are your best friends. Also, make sure you're very comfortable with SVG. D3 charts are typically rendered in SVG, so you'll need to have a good grasp of the nuances of SVG element creation and positioning. Lucky for you, SVG is a hot topic lately, so go devour all the SVG info you can. It's [fun](http://talks.brennaobrien.com/svg) anyways.

[My top albums chart](https://github.com/brenna/top-10-albums/blob/master/app/js/barChart.js) was a pretty straightforward bar chart and I used Mike Bostock's [reusable chart pattern](http://bost.ocks.org/mike/chart/) as a guideline for building it out.

One notable exception is that I made my chart responsive by using the `viewBox` attribute instead of a fixed width and height. See, knowing SVG gets you places. This eliminates the need for a complete redraw on window resize. I'd say it works pretty well considering how much easier it it to implement. Just know that everything will shrink completely proportionately (including text sizing), so I'd go back to width/height/redraw if I needed a really customized soultion that was tailored for small viewports.

###Step 4: Merge in my personal ranking

To integrate my personal ranking, I created an array of my top albums:

<pre class="prettyprint"><code class="language-js">var favouriteAlbums = [
  "Our Love", //Caribou
  "You're Dead!", //Flying Lotus
  "St. Vincent", //St. Vincent
  "Oxymoron", //ScHoolboy Q
  "They Want My Soul", //Spoon
  "Do It Again", //Röyksopp & Robyn
  "Wonder Where We Land", //SBTRKT
  "Salad Days", //Mac DeMarco
  "Here and Nowhere Else", //Cloud Nothings
  "LP1" //FKA Twigs
];
</code></pre>

then did a quick comparison with my last.fm data to add a `rank` property to each album object. 

The chart now gets drawn with the master albums array that contains both play count and rank data. From here, the power of D3's data binding reveals it's magic. Since all the data (not just what you're visibly seeing) is attached to the chart elements, we ask D3 to re-calculate the y position of each bar based on either `rank` or play count (the natural array order).

<pre class="prettyprint"><code class="language-js">chart.orderByRank = function() {
  d3.selectAll('.album')
  .transition(700)
  .attr('fill', 'url(#warmGradient)')
  .attr('transform', function(d){
    return 'translate(0,' + (d.rank - 1) * (barHeight + barMargin) + ')';
  });

  return chart;
};

chart.orderByPlayCount = function() {
  d3.selectAll('.album')
  .transition(700)
  .attr('fill', 'url(#coolGradient)')
  .attr('transform', function(d, i){
    return 'translate(0,' + i * (barHeight + barMargin) + ')';
  });

  return chart;
};
</code></pre>

I then added some UI buttons that trigger these redraw methods on click. The `.transition()` method magically takes care of smoothly animating the bars' positions and the fill colour gets updated as a visual indicator of the chart state. If you'd like a deep dive into how the D3 magic works, [this is a great read.](http://bost.ocks.org/mike/selection/)

###Want to learn something new? Build a thing.

I think there are a few specific technical takeaways from this post and this project but the biggest one I want to emphasize is that **the best way to learn is to dive in and build something**. Sure, you need a little bit of knowledge, like reading the docs or a getting started tutorial, before you can start writing code in a new language/framework/whatever, but there's no replacement for encountering a problem you don't know how to solve and being forced to tackle it.  Plus, you have something cool to show for it in the end.

I can't tell you how many programming books I've started and abandoned before finishing. It just doesn't stick until you get your hands dirty and try it yourself. It may be frustrating but you have a community of other self-taught, self-learning developers (especially when it comes to front-end) that have gone through the same thing and are hopefully sharing their experiences online in some form. If you run into a snag with any of these tools, please [get in touch](http://twitter.com/brnnbrn)! 







