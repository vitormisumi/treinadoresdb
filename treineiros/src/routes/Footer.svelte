<script>
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
      <a href="/">Home</a>
      <a href="/sobre">Sobre</a>
      <a href="/h2h">H2H</a>
      <a href="/rankings">Rankings</a>
  </div>
</section>

<style>
  #footer {
    background-color: var(--main-color);
    margin: 0;
    padding: 5%;
  }
  
  h3, p, label, a {
    color: var(--background-color);
  }

  h3 {
    margin-top: 0;
  }

  textarea {
    width: min(75%, 300px);
    height: 100px;
  }
</style>
