<script>
  import Navbar from "./Navbar.svelte";
  import Hero from "./Hero.svelte";
  import About from "./About.svelte";
  import Numbers from "./Numbers.svelte";
  import Matches from "./Matches.svelte";
  import Footer from "./Footer.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Navbar />
<p>{data.name}</p>
<Hero />
<About />
<Numbers />
<Matches />
<!-- <Footer {menu_items} /> -->
