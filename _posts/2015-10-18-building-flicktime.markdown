---
layout: post
title:  "How I Created My Movie Syncing Web App"
date: OCT 18
tag: Project
---
#How I Created My Movie Syncing Web App

[Flictime](https://github.com/matthunz/flicktime) is my web app that allows you to watch movies with long-distance friends. It syncs the movie's time, play, and pause status so that you can always be at the same time. It also provides a live chat. Here's how I built it:

##Account creation
Flicktime uses one of the most basic account systems possible: It simply stores your info in a cookie, there's nothing server-side. I figured I didn't need anything more complex because the "account" is just a way to keep track of who's saying what in the chat.

For the cookies I used [jQuery-Cookie](https://github.com/carhartl/jquery-cookie), a jQuery API that handles the viewing and creation of cookies. You can set a cookie with:

{% highlight JavaScript %}
$.cookie('name', 'value');
{% endhighlight %}

and read a cookie with:

{% highlight JavaScript %}
$.cookie('name');
{% endhighlight %}

When the page loads, I declare the first and last name variables with:

{% highlight JavaScript %}
var first = $.cookie('first');
var last = $.cookie('last');
{% endhighlight %}

The site then checks if the cookies exist and opens a login form if they don't:

{% highlight JavaScript %}
if(first){
  // Code if cookies exist
}else{
  $('#login').fadeIn(500);
}
{% endhighlight %}

Finally, the site gets the user's initials for their chat icon:

{% highlight JavaScript %}
var initials = first.slice(0,1) + last.slice(0,1);
// This returns the first letter of the variables "first" and "last"
{% endhighlight %}

##Syncing with socket.io
[Socket.io](http://socket.io/) is a framework for Nodejs that allows for event-based communication with HTML5 websockets. I used this to sync pauses, plays, and the current time to users.

For example, on Flicktime, when a user pauses the video it pauses for everyone else with:

{% highlight JavaScript %}
// Emit the message "pause" to other users with the current time
socket.emit('pause', current);

// Recieve another user's message and their current time
socket.on('pause', function(current){
  video.pause();
  video.currentTime = current;
});
{% endhighlight %}

and this on the server-side:

{% highlight JavaScript %}
io.on('connection', function(socket){
  // Triggers when a user emits "pause"
  socket.on('pause', function(current){
    // Emits "pause" to other users
    io.emit('pause', current);
  });
});
{% endhighlight %}

You can view this project on [GitHub](https://github.com/matthunz/flicktime) but keep in mind that I wrote this spaghetti code at 3am before school (that's my excuse).
