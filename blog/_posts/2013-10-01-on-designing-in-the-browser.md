---
title: On Designing in the Browser
layout: blog_post
intro: Whether it’s fear of a blank text editor or reluctance to change your workflow, it can be tough to try somethings as radical as designing a website through code. But the freedom of my own project plus my sub-wizard PhotoShop skills meant it was go time.  Here’s what I learned along the way.
---

*This is the second instalment in a series of posts detailing the new things I tried during my recent site re-build. [Read part 1 about Jekyll here.](/blog/2013/05/on-building-a-site-with-jekyll.html)*

### Lesson 1: It's okay to start somewhere else

The term “design in the browser” unfortunately makes it sound like you’re forbidden from taking a pen to paper or opening any design software.  But just like great traditional design workflows that start with wireframes or [style guides](http://www.smashingmagazine.com/2010/07/21/designing-style-guidelines-for-brands-and-websites/), establishing a foundation outside the browser is not only okay, but extremely helpful.

Many experienced designers still swear by pen and paper sketches, and that’s where I made the majority of my layout decisions. I also used PhotoShop to experiment with colour swatches and play around with different logo treatments. Once that direction was established, I was armed with a whole lot of design pieces that were ready to be translated into code. And that makes staring at an empty CSS file a lot less intimidating. So go ahead and get started wherever you feel comfortable. You'll get your ideas down quickly and jump start your actual in-browser design.

### Lesson 2: Slow Dev is Slooooooow <br> (but not really)

Designing in the browser is going to feel slow, and that’s going to be discouraging, especially if you’re used to blazing through CSS like I am. But it’s important to remember that you’re not just writing CSS, **you’re also making design decisions while writing CSS.**  Consider it re-distributed time, borrowed from wherever you decided *not* to push pixels around before heading to the browser.

And when you consider time spent on design iterations, working in-browser will likely save you time.  

> *Change the font size of every sub-heading in a .psd or edit a single line of CSS?*

> *Switch the order of two sections using PhotoShop or cut and paste a block of HTML?*

These are notoriously tedious tasks to complete using design software, but inherently easy in code. Think about what the C in CSS stands for and remember that HTML *is*  your content.  It really shouldn’t be surprising that creating websites within their final medium is an efficient way to go about it. 

### Web pages in their natural habitat

Not only is designing in the browser efficient, it helps safeguard against unexpected surprises. I’ve had so many disappointing experiences with fonts that look great on my system, but render illegibly as web fonts in certain browsers or at certain sizes.  The browser is a curious creature that doesn't always do what you expect it to do, and there's never been a bigger list of browsers and devices for us to cater to.  The sooner you get design elements into their proper home, the better equipped you’ll be to fix up any discrepancies between your vision and the output.

You'll also find it easier to create the moving parts of a web page when designing in the browser. Current web design is full of flourishes, yet it's difficult to show even a hover state in a design mockup.<sup>*</sup>  These things live in the browser! You should be creating them there too.

<small>* I dare you to explain parallax effects without linking to a live example.</small>

### Performance-driven design made easy 

Designing in the browser also promotes good design practices.  While I’m already an idealist when it comes to making CSS-only assets, starting in code fully encourages an exploration of what modern HTML & CSS can do. Spoiler alert: it’s a [glorious](http://cdpn.io/hbDqL) [treasure](http://cdpn.io/Eoqul) [trove](http://cdpn.io/pgdKf) [of](http://cdpn.io/pClvo) [cool](http://cdpn.io/gpHxz) [shit](http://cdpn.io/wGvKs).  Check out the striped background in my header and footer, made with a [repeating gradient](http://lea.verou.me/2010/12/checkered-stripes-other-background-patterns-with-css3-gradients/). In addition to bragging rights, you’re looking at significant performance gains. A few lines of CSS will typically cost less that requesting another image.

It’s a bigger topic best saved for another blog post, but designing in the browser also plays quite nicely with [mobile-first design and dev](http://bradfrostweb.com/blog/mobile/the-many-faces-of-mobile-first/).  You see, there’s this [RWD](http://twitter.com/rwd) trap where you build a full-featured “desktop sized” site, then start killing off all the fancy bits inside media queries to make it fit on a small screen.  But that means you’re serving *more* CSS to the less powerful, lower bandwidth device.  And it’s really tough to escape that when your starting point is a full “desktop sized” comp. Of course, many designers can and will create mobile comps to go along with the big ones, but they’re often ad hoc, and why design something twice?  Old design conventions just don’t cut it here.  Conversely, designing in the browser totally gives you the freedom to start simple, then scale up only when needed, and that’s mobile-first friendly.

### Look out! This game changes quickly. 

While my personal experience with designing in the browser was extremely positive, I was admittedly in a pretty cushy position to try it. Change is hard, and many of you will remain unconvinced.  But I urge you to consider the current state of the web and those who build it before dismissing the idea. I call myself a front-end developer, but I designed my own site.  I’ve seen countless job postings for Web or UX Designers asking for HTML & CSS knowledge, and many designers I know are learning how to code.

Similarly, a recent discussion on whether or not to include PhotoShop in our HackerYou [front-end bootcamp](http://hackeryou.com/courses/front-end-bootcamp/) curriculum ended with a pretty confident no; learning PhotoShop would be time intensive for a course that we’re packing full with great content, plus, none of us were fully convinced it’s an essential front-end dev skill. But we also had no intention of leaving our future freelancers without any web design smarts, so we settled on a list of design topics like sketching wireframes, what makes for good UX, and typography fundamentals. Coincidentally, that list is about what you’d need to know to successfully design in the browser.

When it comes to the front-end, the lines between design and dev are quickly blurring, even if our workflows haven’t fully converged.  Standing here in the foggy collision of the two, designing in the browser looks a lot like the way forward.