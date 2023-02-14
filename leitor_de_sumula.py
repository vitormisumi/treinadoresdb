from PyPDF2 import PdfReader
from requests import get
from re import finditer

urls = ['https://conteudo.cbf.com.br/sumulas/2015/42452se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2017/142371se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2022/142374se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2014/242372se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2022/342181se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2018/342186se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2022/342216se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2022/424121se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2015/424158se.pdf',
        'https://conteudo.cbf.com.br/sumulas/2017/542250se.pdf']


class Sumula:
    def __init__(self, pdf):
        self.first_page = PdfReader(pdf).pages[0].extract_text()
        self.second_page = PdfReader(pdf).pages[1].extract_text()
        self.third_page = PdfReader(pdf).pages[2].extract_text()

    def competition(self):
        text = self.first_page
        competition_string = '\nCampeonato: '
        competition_string_index = text.find(competition_string)
        competition_start_index = competition_string_index + \
            len(competition_string)
        end_string_index = text.find(' Rodada:', competition_start_index)
        if competition_string_index == -1:
            return None
        else:
            return text[competition_start_index: end_string_index].split(sep='/')[0].strip()

    def competition_year(self):
        text = self.first_page
        competition_string = '\nCampeonato: '
        competition_string_index = text.find(competition_string)
        competition_start_index = competition_string_index + \
            len(competition_string)
        end_string_index = text.find(' Rodada:', competition_start_index)
        if competition_string_index == -1:
            return None
        else:
            return text[competition_start_index: end_string_index].split(sep='/')[1].strip()

    def home_team(self):
        text = self.first_page
        game_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = text.find(game_string, game_start_index + 1)
        x_index = text.find(' X', game_start_index)
        home_team = text[game_start_index + len(game_string): x_index]
        return home_team.split(sep='/')[0].strip()

    def home_team_state(self):
        text = self.first_page
        game_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = text.find(game_string, game_start_index + 1)
        x_index = text.find(' X', game_start_index)
        home_team = text[game_start_index + len(game_string): x_index]
        return home_team.split(sep='/')[1].strip()

    def away_team(self):
        text = self.first_page
        game_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = text.find(game_string, game_start_index + 1)
        x_index = text.find('X', game_start_index) + 2
        line_break_index = text.find('\n', x_index)
        away_team = text[x_index: line_break_index]
        return away_team.split(sep='/')[0].strip()

    def away_team_state(self):
        text = self.first_page
        game_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = text.find(game_string, game_start_index + 1)
        x_index = text.find('X', game_start_index) + 2
        line_break_index = text.find('\n', x_index)
        away_team = text[x_index: line_break_index]
        return away_team.split(sep='/')[1].strip()

    def home_coach(self):
        text = self.second_page
        text = text.replace('Tecnico', 'Técnico')
        coach_string = '\nTécnico: '
        coach_string_index = text.find(coach_string, text.find(
            self.home_team() + ' / ' + self.home_team_state()),
            text.find(self.away_team() + ' / ' + self.away_team_state()))
        coach_start_index = coach_string_index + len(coach_string)
        if coach_string_index == -1:
            return None
        else:
            line_break_index = text.find('\n', coach_start_index)
            dash_index = text.find('-', coach_start_index)
            if dash_index == -1 or dash_index >= line_break_index:
                return text[coach_start_index: line_break_index].title().strip()
            elif dash_index < line_break_index:
                return text[coach_start_index: dash_index].title().strip()

    def away_coach(self):
        text = self.second_page
        text = text.replace('Tecnico', 'Técnico')
        coach_string = '\nTécnico: '
        coach_string_index = text.find(coach_string, text.find(
            self.away_team() + ' / ' + self.away_team_state()), text.find('Gols'))
        coach_start_index = coach_string_index + len(coach_string)
        if coach_string_index == -1:
            return None
        else:
            line_break_index = text.find('\n', coach_start_index)
            dash_index = text.find('-', coach_start_index)
            if dash_index == -1 or dash_index >= line_break_index:
                return text[coach_start_index: line_break_index].title().strip()
            elif dash_index < line_break_index:
                return text[coach_start_index: dash_index].title().strip()

    def date(self):
        text = self.first_page
        date_string = '\nData: '
        date_string_index = text.find(date_string)
        date_start_index = date_string_index + len(date_string)
        if date_string_index == -1:
            return None
        else:
            return text[date_start_index: date_start_index + 10]

    def time(self):
        text = self.first_page
        time_string = 'Horário: '
        time_string_index = text.find(time_string)
        time_start_index = time_string_index + len(time_string)
        if time_string_index == -1:
            return None
        else:
            return text[time_start_index: time_start_index + 5]

    def stadium(self):
        text = self.first_page
        stadium_string = 'Estádio: '
        stadium_string_index = text.find(stadium_string)
        stadium_start_index = stadium_string_index + len(stadium_string)
        line_break_index = text.find('\n', stadium_start_index)
        if stadium_string_index == -1:
            return None
        else:
            return text[stadium_start_index: line_break_index]

    def home_score(self):
        text = self.first_page
        goal_string = 'Resultado Final: '
        goal_string_index = text.find(goal_string)
        goal_start_index = goal_string_index + len(goal_string)
        space_index = text.find(' ', goal_start_index)
        if goal_string_index == -1:
            return None
        else:
            return text[goal_start_index: space_index]

    def away_score(self):
        text = self.first_page
        goal_string = 'Resultado Final: '
        goal_string_index = text.find(goal_string)
        goal_start_index = goal_string_index + len(goal_string)
        line_break_index = text.find('\n', goal_start_index)
        if goal_string_index == -1:
            return None
        else:
            return text[goal_start_index: line_break_index].split(sep=' ')[2]

    def home_yellow_cards(self):
        text = self.second_page
        return text.count(self.home_team(), text.find('Cartões Amarelos'), text.find('Cartões Vermelhos'))

    def away_yellow_cards(self):
        text = self.second_page
        return text.count(self.away_team(), text.find('Cartões Amarelos'), text.find('Cartões Vermelhos'))

    def home_red_cards(self):
        text = self.second_page
        return text.count(self.home_team(), text.find('Cartões Vermelhos'))

    def away_red_cards(self):
        text = self.second_page
        return text.count(self.away_team(), text.find('Cartões Vermelhos'))

    def home_subs(self):
        text = self.third_page
        return text.count(self.home_team(), text.find('Substituições'))

    def away_subs(self):
        text = self.third_page
        return text.count(self.away_team(), text.find('Substituições'))

    def first_home_sub(self):
        if self.home_subs == 0:
            return None
        text = self.third_page
        home_team = self.home_team()
        first_half_indices = finditer(
            pattern='1T{}'.format(home_team), string=text)
        first_half_sub_minutes = [
            text[index.start() - 6: index.start() - 4] for index in first_half_indices]
        half_time_indices = finditer(
            pattern='INT{}'.format(home_team), string=text)
        half_time_sub_minutes = [text[index.start() - 6: index.start() - 4]
                                 for index in half_time_indices]
        if first_half_sub_minutes:
            first_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in first_half_sub_minutes]
            return [min(first_half_sub_minutes), '1T']
        elif half_time_sub_minutes:
            return [45, 'INT']
        else:
            second_half_indices = finditer(
                pattern='2T{}'.format(home_team), string=text)
            second_half_sub_minutes = [
                text[index.start() - 6: index.start() - 4] for index in second_half_indices]
            second_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in second_half_sub_minutes]
            return [min(second_half_sub_minutes), '2T']

    def first_away_sub(self):
        if self.away_subs == 0:
            return None
        text = self.third_page
        away_team = self.away_team()
        first_half_indices = finditer(
            pattern='1T{}'.format(away_team), string=text)
        first_half_sub_minutes = [
            text[index.start() - 6: index.start() - 4] for index in first_half_indices]
        half_time_indices = finditer(
            pattern='INT{}'.format(away_team), string=text)
        half_time_sub_minutes = [text[index.start() - 6: index.start() - 4]
                                 for index in half_time_indices]
        if first_half_sub_minutes:
            first_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in first_half_sub_minutes]
            return [min(first_half_sub_minutes), '1T']
        elif half_time_sub_minutes:
            return [45, 'INT']
        else:
            second_half_indices = finditer(
                pattern='2T{}'.format(away_team), string=text)
            second_half_sub_minutes = [
                text[index.start() - 6: index.start() - 4] for index in second_half_indices]
            second_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in second_half_sub_minutes]
            return [min(second_half_sub_minutes), '2T']


for url in urls:
    response = get(url)
    pdf_file_name = '{}'.format(url.split(sep='/')[-1])
    pdf = open(pdf_file_name, 'wb')
    pdf.write(response.content)
    pdf.close()
    p = Sumula(pdf_file_name)
    print(p.home_coach())
