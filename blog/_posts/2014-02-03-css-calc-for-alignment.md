---
title: Aligning position:fixed Elements with CSS calc
layout: blog_post
intro: CSS calc is aweseome and I found another use case for it.
customjs: 
 - //codepen.io/assets/embed/ei.js
---

Ever had trouble getting a position:fixed element to line up with something?

<figure>
    <img src="{% asset_path blog/position-fixed-uh-oh.png%}" alt="'position fixed element working as expected, in line with the main content"/>
</figure>

I wanted this floating bubble to sit aligned with my content wrapper, but the fluid distance between the wrapper and the edge of the screen made it hard to find the right `right` value. 

**Pixels** are no good here since the distance is completely fluid.

**Percentages** sounded more promissing, since they're calculated relative to the screen width, but I still couldn't get a consistent alignment out of that. This is probably because the wrapper width is set in px.

###Some crazy combination of the two?<br>Calc to the resuce!

Turns out you can combine what you know in pixels and percentages and let the browser figure out the rest with calc. 

To position the bubble precisely inside the wrapper, we can use:

<pre><code>right: -webkit-calc(50% - 530px);
right: calc(50% - 530px);
</code></pre>


Here's a breakdown of how to get   that mysterious formula:

<figure>
    <img src="{% asset_path blog/position-fixed-calc.png%}" alt="'position fixed element working as expected, in line with the main content"/>
</figure>

*total space outside the wrapper* = 100% - 1060px<br>
*half of that (for the right side only)* = (100% - 1060px)/2<br>
*simplify that a bit* = 50% - 530px

Pretty aweseome, right?

Here's a more complete snippet for your integrating pleasure.

<pre><code>
  .wrapper {
    max-width: 1060px;
    margin: 0 auto;
  }

  .floating-bubble {
    position: fixed;
    top: 100px; /*accounts for fixed header*/
    right: -webkit-calc(50% - 530px); /*50% - half your wrapper width*/
    right: calc(50% - 530px);
  }
</code></pre>

And a more elaborate, responsive CodePen demo. Scroll around and view it [in full](http://cdpn.io/Kewds) to witness the flexibility.

<div data-height="324" data-theme-id="4145" data-slug-hash="Kewds" data-default-tab="result" class='codepen'><pre><code>.wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
}

.content {
  padding-right: 210px;
}

.bubble {
  position: fixed;
  top: 20px;
  right: calc(50% - 450px + 30px);
}

@media all and (max-width: 900px){
  .bubble {
    right: 20px;
  }
}


/* just some pretty stuff below here */
* {
  box-sizing: border-box;
}

body {
  background: #ecf0f1;
}

h1 {
  font-size: 50px;
}

p {
  font-size: 25px;
  line-height: 1.4;
}

a {
  color: #128b98;
  text-decoration: none;
}

a:hover {
  border-bottom: solid 1px #128b98;
}

.wrapper {
  background: #fff;
}

.bubble {
  width: 180px;
  height: 180px;
  background: #128b98;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  padding: 50px 30px;
  font-size: 20px;
}</code></pre>
<p>See the Pen <a href='http://codepen.io/brenna/pen/Kewds'>Alignment with CSS calc</a> by Brenna O'Brien (<a href='http://codepen.io/brenna'>@brenna</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
</div>


###Futher Reading

This is similar to Lea Verou's awesome trick for [single element full-bleed wrappers](http://lea.verou.me/more-css-secrets/#slide14). Chris Coyier has a great round up of some other use cases [over on CSS-Tricks](http://css-tricks.com/a-couple-of-use-cases-for-calc/) too.

Browser support for calcl is pretty great. IE8 and a couple mobile browsers are the outliers. In this case, mobile browsers aren't really an issue since screen width = wrapper width there, and I don't consider it a deal breaker if that bubble isn't perfectly aligned in IE8. 

Give it a try next time you've got a tricky value to set! 