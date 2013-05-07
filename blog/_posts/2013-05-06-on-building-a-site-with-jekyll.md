---
title: On Building a Site with Jekyll
layout: blog_post
intro: I said goodbye to my CMS in favour of <a href="http://jekyllrb.com">Jekyll</a> and I couldn't be happier.  A++++ would build again.
---

*The beauty of working on your own website is the freedom to experiment with new tools and strategies. This is the first in a series of posts about what I tried and how it went.*

Jekyll is a "blog aware" static site generator. For me, that means I'm writing this post in markdown instead of dealing with some awful WSYWIG editor.  I also don't have to worry about databases or any server side code, just the clean and easy [Liquid](https://github.com/Shopify/liquid) template markup. For a simple blog and portfolio site like this, it's the perfect tool. 

To get started, I worked through [this tuts+ tutorial](http://net.tutsplus.com/tutorials/other/building-static-sites-with-jekyll/), though the freshly updated [official documentation](http://jekyllrb.com/docs) is very comprehensive and easy to understand. While Jekyll did a lot of what I needed out of the box, here's what's unique in my setup.

###Blog Posts and Work Posts

Coming from WordPress, I originally thought of my blog posts and portfolio pieces as two separate post types.  In Jekyll, all posts are more or less created equal, so I used categories to segregate the content. This is super easy to accomplish by putting blog posts in a folder called "blog" and work posts in a folder called "work. Not only does this automatically assign the right category to the posts, it also creates an appropriate URL structure for the site. 

Here's the relevant part of my directory structure.

    .
    ├──work
    │  └──_posts
    │  │  └──2013-01-10-axiomatic-solutions.md
    │  index.html
    ├──blog
    │  └──_posts
    │  │  └──2013-05-06-working-with-jeyll.md
    │  index.html

Then in each `index.html` file, we loop over posts within a single category, instead of all posts.

<pre><code>&#123;% for post in site.categories['work'] %&#125;
    &lt;!--single post code--&gt;
&#123;% endfor %&#125;
</code></pre>

###Managing Assets

While trying to figure out proper paths to images in my blog posts, I stumbled upon [Jekyll Assets](https://github.com/ixti/jekyll-assets), and now consider it an essential plugin for a Jekyll site. Quick and easy image paths is the boring part. Jekyll Asseets can also:
* compile Sass
* concatenate, minify, &amp; gzip CSS &amp; JS files
* add cache-busting suffixes to all asset files

Once configured, this all happens under the hood on site build. Definitely a big time saver.  

###Automagic Deployment

And while we're on the topic of automation, my Jekyll site is a breeze to deploy and maintain. There are [several options](http://jekyllrb.com/docs/deployment-methods/) for this, but I settled on using [GitHub webhooks](https://help.github.com/articles/post-receive-hooks).

This [very detailed tutorial](http://zacht.me/zacht/site/articles/Deploy-Jekyll-With-A-Github-Webhook/) has all the gritty details of how this works for a Jekyll site, but essentially, we're configuring GitHub to automatically execute a small script (in a PHP file on the server) each time a push to the remote repo is made.  

In my case, I have a test server and a production server. I've mirrored this in my git repo with a test branch off of my master branch.  On the test server, the script to execute after a push is:
{%highlight php %}
<?php `git pull origin test`; ?>
{% endhighlight %}
And on the production server:
{%highlight php %}
<?php `git pull`; ?>
{% endhighlight %}

So the test and production servers will always be a reflection of their git branch counterparts, and I'm free to manage the site completely through git, as I would have done for version control anyhow.

### Et Voila!

So here you have it, my first Jekyll build. 

If you're curious about any more of the details, take a look at the [source files](https://github.com/brenna/brennaobrien.com) or [get in touch.](mailto:hi@brennaobrien.com)