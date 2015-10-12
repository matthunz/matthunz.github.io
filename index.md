---
layout: index
---
<html>
<head>
  <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/3.18.1/build/cssreset/cssreset-min.css">
  <link href='https://fonts.googleapis.com/css?family=Raleway:600,700,500|Merriweather:400,400italic|Roboto+Mono' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" type="text/css" href="style.css">
  <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
  <script type="text/javascript" src="js.js"></script>
</head>
<body>
  <div id="logo">Matt Hunzinger</div>
  <div id="loader"></div>
  <div id="cloak" class="cover"></div>
  <div id="content">
    <header>
      <div class="center" id="title">
        <h1>
          <span>/</span>
          Journal
        </h1>
      </div>
      <div id="count" class="wrap">
        <span>05</span>
        <br>Entries
      </div>
      <script type="text/javascript" src="canvas.js"></script>
      <canvas width="600" height="500"></canvas>
    </header>
    <div id="blog" class="wrap">
    {% for post in site.posts %}
    <div class="post">
        <a class="cover" href="{{ post.url }}"></a>
        <div class="date"></div>
        <div class="title">{{ post.title }}</div>
    </div>
    {% endfor %}
  </div>
</body>
</html>
