---
title: Auto-populating WordPress Taxonomies with Custom Post Entries
layout: blog_post
intro: A better way of linking custom post types.
---

I've always found linking between post types to be clunky. Sure, it's simple enough to *create the link* using plugins like [Advanced Custom Fields](http://www.advancedcustomfields.com/resources/field-types/relationship/) or [Posts to Posts](http://wordpress.org/plugins/posts-to-posts/), but querying by relationship data within templates can get messy. 

For example, when I wanted a count of all `post-type-A` entries that had a relationship to a particular `post-type-B` entry, I eneded up having to write a beast of a custom SQL query. Not exactly harnessing the power of WordPress, amirite? 

Compare that to the way taxonomies natively work. If I want to know how many `post-type-A` entries have been tagged with taxonomy term `category-1` it's a simple matter of:

    $term = get_term_by('slug', 'category-1', 'my-taxonomy');
    $count = $term->count;

Wouldn't it be great to have a custom taxonomy on `post-type-A` auto-populate with the entries from `post-type-B`?  Turns out that's pretty easy. 

<!-- For example, say you have a custom post type for events. Each event will take place at a venue, and those venues must also have detailed profiles, so they're custom post types too.

To link an event to a venue you'll have two options:

1. Tag each event (via an events custom taxonomy) with a venue name that matches up with the venues added as custom posts.

2. Use a plugin, like [Advanced Custom Fields](http://www.advancedcustomfields.com/resources/field-types/relationship/) or [Posts to Posts](http://wordpress.org/plugins/posts-to-posts/) to creates relationships between events and venues.

I tended to steer way clear of option 1, since this would required **manually updating the taxonomy terms** every time a new venue was added.  Maybe new venues didn't get added often, but dammit, I'm an idealist and this thing needs to be scalable!

Option 2 was automagic in the sense that any newly added venue was available to choose from when adding the relationship, but **querying events that matched a particular relationship can be real messy** (i.e "find all events where 'event-venue' == 'The Bronze'"). 

At one point, I just wanted a count of all events that were taking place at a particular venue, and had to write a big ugly custom SQL query:

    $meta_key = 'event_venue';
    $meta_value = '%'. $venue_name .'%';
   
    $sql = "SELECT count(DISTINCT pm.post_id)
    FROM $wpdb->postmeta pm
    JOIN $wpdb->posts p ON (p.ID = pm.post_id)
    WHERE pm.meta_key = '$meta_key'
    AND pm.meta_value LIKE '$meta_value'
    AND p.post_type = 'events'
    AND p.post_status = 'publish'
    ";

    $count = $wpdb->get_var($sql);

Gross. Not exactly what WP was intended for. 

Compare this with counting the number of entires in a given taxonomy term:

    $term = get_term_by('slug', $venue_name, 'event-venue');
    $count = $term->count;

Wouldn't it be nice if we could use the taxonomy but *also* have automagic term generation? Yes, yes it would. -->

###The Plan

In your theme's functions file, we can use [`register_taxonomy`](http://codex.wordpress.org/Function_Reference/register_taxonomy), [`wp_insert_term`](http://codex.wordpress.org/Function_Reference/wp_insert_term), [`wp_update_term`](http://codex.wordpress.org/Function_Reference/wp_update_term), and the [`save_post`](http://codex.wordpress.org/Plugin_API/Action_Reference/save_post) action to setup a new custom taxonomy, then assign or update terms whenever a custom post gets updated.

###Step 1: Create a Custom Taxonomy for `post-type-A`

This is pretty standard if you've created a custom taxonomy before.  The only notable exception is that we set some restricted capabilities to prevent non-admin users from editing the auto-generated terms. Attach it to the custom post type that you want to be tagged.

<pre class="prettyprint"><code class="language-php">function custom_tax_init(){

  //set some options for our new custom taxonomy
  $args = array(
    'label' => __( 'My Custom Taxonomy' ),
    'hierarchical' => true,
    'capabilities' => array(
      // allow anyone editing posts to assign terms
      'assign_terms' => 'edit_posts',
      /* 
      * but you probably don't want anyone except 
      * admins messing with what gets auto-generated! 
      */
      'edit_terms' => 'administrator'
    )
  );

  /* 
  * create the custom taxonomy and attach it to
  * custom post type A 
  */
  register_taxonomy( 'my-taxonomy', 'post-type-A', $args);
}

add_action( 'init', 'custom_tax_init' );
</code></pre>

###Step 2: Populate terms based on `post-type-B`

We'll use the wordpress `save_post` action to trigger an update function whenever a `post-type-B` post is created or edited.  Note that `save_post` is a catch all for any kind of update, for any post type, so we'll need to:
* make sure we're dealing with a `post-type-B` post 
* determine if a post is compltely new or just being edited 

We map the following data:
 * post title ->  term name
 * post slug ->  term slug
 * post ID -> term description (as a unique link)

<pre class="prettyprint" ><code>function update_custom_terms($post_id) {

  // only update terms if it's a post-type-B post
  if ( 'post-type-B' != get_post_type($post_id)) {
    return;
  }

  // don't create or update terms for system generated posts
  if (get_post_status($post_id) == 'auto-draft') {
    return;
  }
    
  /*
  * Grab the post title and slug to use as the new 
  * or updated term name and slug
  */
  $term_title = get_the_title($post_id);
  $term_slug = get_post( $post_id )->post_name;

  /*
  * Check if a corresponding term already exists by comparing 
  * the post ID to all existing term descriptions. 
  */
  $existing_terms = get_terms('my-taxonomy', array(
    'hide_empty' => false
    )
  );

  foreach($existing_terms as $term) {
    if ($term->description == $post_id) {
      //term already exists, so update it and we're done
      wp_update_term($term->term_id, 'my-taxonomy', array(
        'name' => $term_title,
        'slug' => $term_slug
        )
      );
      return;
    }
  }

  /* 
  * If we didn't find a match above, this is a new post, 
  * so create a new term.
  */
  wp_insert_term($term_title, 'my-taxonomy', array(
    'slug' => $term_slug,
    'description' => $post_id
    )
  );
}

//run the update function whenever a post is created or edited
add_action('save_post', 'update_custom_terms');
</code></pre>

You can also run these functions multiple times if you need more than one relationship of this kind.

Grab both snippets as a gist [here](https://gist.github.com/brenna/7377802).