<script>
    let tableHeaders = ['', 'J', 'V', 'E', 'D', 'GF', 'GS', 'CA', 'CV', '%']
</script>

<section id="history">
    <h2>Histórico</h2>
    <p>Agrupar por:</p>
    <input type="checkbox" name="team" id="team">
    <label for="team">Equipe</label>
    <input type="checkbox" name="season" id="season">
    <label for="season">Temporada</label>
    <input type="checkbox" name="competition" id="competition">
    <label for="competition">Competição</label>
    <table>
        <tbody>
            <tr>
            {#each tableHeaders as header}
                <th>{header}</th>
            {/each}
            </tr>
            <tr>
                <td>Total</td>
            </tr>
        </tbody>
    </table>
</section>