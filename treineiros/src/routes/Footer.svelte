<script>
</script>

<section id="footer">
  <div id="contact">
    <h3>Entre em contato</h3>
    <p>
      Caso tenha ficado com alguma dúvida, tenha encontrado algum problema ou
      tenha alguma sugestão, nos envie uma mensagem através do formulário
      abaixo:
    </p>
    <form action="https://formsubmit.co/2d815fdbc924813927e605f56270e4a5" method="POST">
      <input type="hidden" name="_subject" value="Nova mensagem de usuário">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="_template" value="box">
      <input type="text" name="_honey" style="display:none">
      <input type="text" name="name" placeholder="Digite seu nome" required />
      <input
        type="email"
        name="email"
        placeholder="Digite seu email"
        required
      />
      <textarea
        name="message"
        placeholder="Digite sua mensagem"
        rows="5"
        required
      />
      <input type="hidden" name="_next" value="https://treineiros.vercel.app/obrigado.html">
      <button type="submit">Enviar</button>
    </form>
  </div>
  <nav id="menu">
    <a href="/">Home</a>
    <a href="/sobre">Sobre</a>
    <a href="/h2h">H2H</a>
    <a href="/rankings">Rankings</a>
  </nav>
</section>

<style>
  #footer {
    background-color: var(--main-color);
    margin: 0;
    padding: 5%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  h3,
  p,
  a {
    color: var(--background-color);
    padding-bottom: 2vh;
  }

  a {
    font-size: clamp(1rem, 2vw, 2rem);
    padding: clamp();
  }

  a:hover {
    color: var(--accent-color);
  }

  input::placeholder,
  textarea::placeholder {
    font-family: var(--main-font);
    color: var(--accent-color);
    opacity: 30%;
  }

  h3 {
    margin-top: 0;
  }

  form {
    display: grid;
    gap: 10px;
  }

  p,
  input,
  textarea {
    margin: 0;
    text-align: justify;
  }

  button {
    width: max(10vw, 100px);
    justify-self: right;
    margin-bottom: 30px;
  }

  nav {
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  @media (max-width: 768px) {
    #footer {
      grid-template-columns: 1fr;
    }
  }
</style>
