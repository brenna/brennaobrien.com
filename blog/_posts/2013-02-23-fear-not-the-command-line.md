---
title: Fear not the command line!
layout: blog_post
intro: 'Somewhere between digging deep into Windows system files as a child and becoming a professional web developer as an adult, I became intimidated by the command line.'
---



Despite its obvious utility to me as a web developer, a little part of me was always certain I’d mistype something and then *everything* would somehow break.

<figure>
    <img src="{% asset_path blog/no-idea.jpg%}" alt="'I have no idea what I'm doing' dog"/>
</figure>

But since I’ve started working regularly with GitHub, logic kicked back in and I’ve realized it’s not such a scary place to be. Here’s a few tips that helped me (or *would* have helped me) as a beginner. Note that I use OS X.

### 1. Just start using it

This is probably the toughest one, but as is the case with any new skill, immersion is often the best way to learn. Try moving one of your projects over to GitHub (no cheating with the GUI!), or try compiling your [Sass][2] files though the command line. Some other ideas that I’ve been able to tackle as a beginner are [setting up][3] [Jekyll][4] and rooting my phone using the [Android SDK][5].

 [2]: http://sass-lang.com/
 [3]: http://net.tutsplus.com/tutorials/other/building-static-sites-with-jekyll/
 [4]: http://jekyllrb.com/
 [5]: http://developer.android.com/sdk/index.html

### 2. Learn the basic UNIX directory commands.

I got away with just cutting and pasting commands for a long time, but [learning the basics][6] of how to move though directories and manage files (move, copy, delete etc.) will help you at least partially understand those lines you’re cutting and pasting. `pwd` (present working directory) and `ls` (list the contents of your current directory) will also keep you from feeling lost in your file system. Eventually, all this will become just as intuitive as using Finder.

 [6]: http://www.med.nyu.edu/rcr/rcr/course/unix4.html

### 3. Get a better terminal

[iTerm][7] is to Terminal as [SublimeText][8] is to Dreamweaver. Though you won’t use all of iTerm’s features at first, it’s much more robust and it’s the current gold standard among developers. Autocomplete and paste history will speed things up for you, and the global hot key is great way to help integrate the command line into your workflow.

 [7]: http://www.iterm2.com
 [8]: http://www.sublimetext.com/

### 4. Get to know `.profile`

You’re going to need to edit this file sooner or later. It’s a personal config file for your shell and it’s found in your home directory (as a hidden file). [Learn how to set a PATH variable][9]. This tripped me up a few times: Anytime you install something that needs to execute commands (like Ruby Gems or the Android SDK), you’ll need to tell your shell where it can find those executables. The [PATH variable][10] in `.profile` is exactly where you do that.

 [9]: http://www.tech-recipes.com/rx/2621/os_x_change_path_environment_variable/
 [10]: http://www.cs.purdue.edu/homes/cs348/unix_path.html

### 5. Use aliases

Aliases are like keyboard shortcuts for the command line, custom words that act as abbreviations for longer commands. Personally, I find typing out long directory paths incredibly annoying, so I [set up aliases][11] that cd into frequently used locations. If you’d like your aliases to persist after closing your session, visit your good friend, `.profile`, and add them there. This made things feel a lot less clunky for me.

 [11]: http://en.wikipedia.org/wiki/Alias_(command)#Creating_aliases

### 6. Make it pretty

Adding a little [colour coding][12] and switching to a [more readable font][13] help me parse everything a little quicker. That goes a long way in making you feel more comfortable in this text-only environment.

 [12]: http://www.sentia.com.au/2009/06/cool-colours-and-github-branch-in-terminal/
 [13]: http://www.fontsquirrel.com/fonts/Inconsolata

Hopefully this helps someone else on their way and over the intimidation hurdle. Trust me, it’s not that bad!