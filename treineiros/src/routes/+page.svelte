<script>
  import Hero from "./Hero.svelte";
  import About from "./About.svelte";
  import Numbers from "./Numbers.svelte";
  import Matches from "./Matches.svelte";
  import Footer from "./Footer.svelte";

  export let data;

</script>

<Hero />
<About />
<Numbers />
<Matches matches={data.matches}/>

<!-- <Footer {menu_items} /> -->
