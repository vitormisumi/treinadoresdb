<script>
  export let menu_items;
</script>

<section id="footer">
  <div id="contact">
    <h3>Entre em contato</h3>
    <p>
      Caso tenha ficado com alguma dúvida, tenha encontrado algum problema ou
      tenha alguma sugestão de como podemos melhorar, nos envie uma mensagem e
      responderemos o quanto antes.
    </p>
    <form action="contact-form-process.php">
      <div id="name">
        <label for="name">Nome</label><br />
        <input type="text" id="name" />
      </div>
      <div id="email">
        <label for="email">Email</label><br />
        <input type="text" id="email" />
      </div>
      <div id="message">
        <label for="message">Mensagem</label><br />
        <textarea id="message" />
      </div>
    </form>
  </div>
  <div id="menu">
    {#each menu_items as item}
      <a href="http://">{item}</a>
    {/each}
  </div>
</section>
