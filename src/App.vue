<template>

<div class="container">

<header>

<h1>CineManía</h1>

<nav>

<router-link to="/">Inicio</router-link>

<router-link to="/favorites">Favoritos</router-link>

</nav>

</header>

<router-view/>

</div>

</template>

<style>

body{
margin:0;
font-family:Arial, Helvetica, sans-serif;
background:#121212;
color:white;
}

.container{
max-width:1200px;
margin:auto;
padding:20px;
}

header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:30px;
flex-wrap:wrap;
}

nav{
display:flex;
gap:20px;
}

a{
color:white;
text-decoration:none;
font-weight:bold;
}

.router-link-active{
color:#00c3ff;
}

body {
  margin: 0;
  background: #111;
  font-family: Arial, sans-serif;
  color: white;
}

a {
  color: white;
  text-decoration: none;
}

</style>
