from PyPDF2 import PdfReader
import requests
from re import finditer
import mysql.connector
from os import path


class PDF:
    def __init__(self, url):
        self.url = url
        self.file_name = url.split(sep='/')[-1]
        self.year = url.split(sep='/')[-2]

    def download(self):
        if path.exists('sumulas/{}/{}'.format(self.year, self.file_name)):
            print('File already downloaded')
            return
        else:
            response = requests.get(self.url)
            if response.status_code == requests.codes.ok:
                pdf = open('sumulas/{}/{}'.format(self.year,
                                                  self.file_name), 'wb')
                pdf.write(response.content)
                pdf.close()
                print('PDF file {} downloaded'.format(self.file_name))
                return
            else:
                raise Exception


class Sumula:
    def __init__(self, pdf):
        self.text = ''
        for x in range(6):
            try:
                self.text += PdfReader(pdf).pages[x].extract_text()
            except:
                break

    def competition(self):
        find_string = '\nCampeonato: '
        competition_string_index = self.text.find(find_string)
        competition_start_index = competition_string_index + \
            len(find_string)
        end_string_index = self.text.find(' Rodada:', competition_start_index)
        if competition_string_index == -1:
            return None
        else:
            return self.text[competition_start_index: end_string_index].split(sep='/')[0].strip()

    def competition_year(self):
        find_string = '\nCampeonato: '
        competition_string_index = self.text.find(find_string)
        competition_start_index = competition_string_index + \
            len(find_string)
        end_string_index = self.text.find(' Rodada:', competition_start_index)
        if competition_string_index == -1:
            return None
        else:
            return int(self.text[competition_start_index: end_string_index].split(sep='/')[1].strip())

    def home_team(self):
        find_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index)
        home_team = self.text[game_start_index + len(find_string): x_index]
        return home_team.split(sep='/')[0].strip().title()

    def home_team_state(self):
        find_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index)
        home_team = self.text[game_start_index + len(find_string): x_index]
        return home_team.split(sep='/')[1].strip()

    def away_team(self):
        find_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index) + 3
        line_break_index = self.text.find('\n', x_index)
        away_team = self.text[x_index: line_break_index]
        return away_team.split(sep='/')[0].strip().title()

    def away_team_state(self):
        find_string = 'Jogo: '
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index) + 3
        line_break_index = self.text.find('\n', x_index)
        away_team = self.text[x_index: line_break_index]
        return away_team.split(sep='/')[1].strip()

    def home_coach(self):
        text = self.text.replace('Tecnico', 'Técnico')
        text = text[text.find('Comissão Técnica'):]
        find_string = '\nTécnico: '
        coach_string_index = text.find(find_string, text.find('{} / {}'.format(self.home_team(
        ), self.home_team_state())), text.find('{} / {}'.format(self.away_team(), self.away_team_state())))
        coach_start_index = coach_string_index + len(find_string)
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
        text = self.text.replace('Tecnico', 'Técnico')
        text = text[text.find('Comissão Técnica'):]
        find_string = '\nTécnico: '
        coach_string_index = text.find(find_string, text.find(
            self.away_team() + ' / ' + self.away_team_state()), text.find('Gols'))
        coach_start_index = coach_string_index + len(find_string)
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
        find_string = '\nData: '
        date_string_index = self.text.find(find_string)
        date_start_index = date_string_index + len(find_string)
        if date_string_index == -1:
            return None
        else:
            year = self.text[date_start_index + 6: date_start_index + 10]
            month = self.text[date_start_index + 3: date_start_index + 5]
            day = self.text[date_start_index: date_start_index + 2]
            return '{}-{}-{}'.format(year, month, day)

    def time(self):
        find_string = 'Horário: '
        time_string_index = self.text.find(find_string)
        time_start_index = time_string_index + len(find_string)
        if time_string_index == -1:
            return None
        else:
            return self.text[time_start_index: time_start_index + 5] + ':00'

    def stadium(self):
        find_string = 'Estádio: '
        stadium_string_index = self.text.find(find_string)
        stadium_start_index = stadium_string_index + len(find_string)
        line_break_index = self.text.find('\n', stadium_start_index)
        if stadium_string_index == -1:
            return None
        else:
            return self.text[stadium_start_index: line_break_index]

    def home_score(self):
        find_string = 'Resultado Final: '
        goal_string_index = self.text.find(find_string)
        if goal_string_index != -1:
            goal_start_index = goal_string_index + len(find_string)
        else:
            find_string = 'Resultado do 2º Tempo: '
            goal_string_index = self.text.find(find_string)
            goal_start_index = goal_string_index + len(find_string)
        space_index = self.text.find(' ', goal_start_index)
        return int(self.text[goal_start_index: space_index])

    def away_score(self):
        find_string = 'Resultado Final: '
        goal_string_index = self.text.find(find_string)
        if goal_string_index != -1:
            goal_start_index = goal_string_index + len(find_string)
        else:
            find_string = 'Resultado do 2º Tempo: '
            goal_string_index = self.text.find(find_string)
            goal_start_index = goal_string_index + len(find_string)
        line_break_index = self.text.find('\n', goal_start_index)
        return int(self.text[goal_start_index: line_break_index].split(sep=' ')[2])

    def home_yellow_cards(self):
        return self.text.count(self.home_team(),
                               self.text.find('Cartões Amarelos'),
                               self.text.find('Cartões Vermelhos'))

    def away_yellow_cards(self):
        return self.text.count(self.away_team(),
                               self.text.find('Cartões Amarelos'),
                               self.text.find('Cartões Vermelhos'))

    def home_red_cards(self):
        return self.text.count(self.home_team(),
                               self.text.find('Cartões Vermelhos'),
                               self.text.find('Ocorrências'))

    def away_red_cards(self):
        return self.text.count(self.away_team(),
                               self.text.find('Cartões Vermelhos'),
                               self.text.find('Ocorrências'))

    def home_subs(self):
        team_string = '{}/{}'.format(self.home_team(), self.home_team_state())
        return self.text.count(team_string, self.text.find('Substituições'))

    def away_subs(self):
        team_string = '{}/{}'.format(self.away_team(), self.away_team_state())
        return self.text.count(team_string, self.text.find('Substituições'))

    def first_home_sub(self):
        if self.home_subs() == 0:
            return None
        home_team = self.home_team()
        first_half_indices = finditer(
            pattern='1T{}'.format(home_team), string=self.text)
        first_half_sub_minutes = [
            self.text[index.start() - 6: index.start() - 4] for index in first_half_indices]
        half_time_indices = finditer(
            pattern='INT{}'.format(home_team), string=self.text)
        half_time_sub_minutes = [self.text[index.start() - 6: index.start() - 4]
                                 for index in half_time_indices]
        second_half_indices = finditer(
            pattern='2T{}'.format(home_team), string=self.text)
        second_half_sub_minutes = [
            self.text[index.start() - 6: index.start() - 4] for index in second_half_indices]
        if first_half_sub_minutes:
            first_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in first_half_sub_minutes]
            return [min(first_half_sub_minutes), '1T']
        elif half_time_sub_minutes:
            return [45, 'INT']
        elif second_half_sub_minutes:
            second_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in second_half_sub_minutes]
            return [min(second_half_sub_minutes), '2T']
        else:
            no_half_indices = finditer(pattern=home_team, string=self.text)
            no_half_sub_minutes = [
                self.text[index.start() - 6: index.start() - 4] for index in no_half_indices]
            return [min(no_half_sub_minutes), '2T']

    def first_away_sub(self):
        if self.away_subs() == 0:
            return None
        away_team = self.away_team()
        first_half_indices = finditer(
            pattern='1T{}'.format(away_team), string=self.text)
        first_half_sub_minutes = [
            self.text[index.start() - 6: index.start() - 4] for index in first_half_indices]
        half_time_indices = finditer(
            pattern='INT{}'.format(away_team), string=self.text)
        half_time_sub_minutes = [self.text[index.start() - 6: index.start() - 4]
                                 for index in half_time_indices]
        second_half_indices = finditer(
            pattern='2T{}'.format(away_team), string=self.text)
        second_half_sub_minutes = [
            self.text[index.start() - 6: index.start() - 4] for index in second_half_indices]
        if first_half_sub_minutes:
            first_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in first_half_sub_minutes]
            return [min(first_half_sub_minutes), '1T']
        elif half_time_sub_minutes:
            return [45, 'INT']
        elif second_half_sub_minutes:
            second_half_sub_minutes = [
                45 + int(x[1:]) if '+' in x else int(x) for x in second_half_sub_minutes]
            return [min(second_half_sub_minutes), '2T']
        else:
            no_half_indices = finditer(pattern=away_team, string=self.text)
            no_half_sub_minutes = [
                self.text[index.start() - 6: index.start() - 4] for index in no_half_indices]
            return [min(no_half_sub_minutes), '2T']


class Connection:
    def __init__(self, file_name):
        self.cnx = mysql.connector.connect(
            host='127.0.0.1',
            port='3306',
            user='root',
            password='8A*EWji7iofvy2Ym',
            database='treineiros'
        )
        self.cur = self.cnx.cursor()
        self.p = Sumula(file_name)
        self.file_name = file_name

    def insert_home_coach(self):
        if self.p.home_coach() is None:
            return None
        else:
            home_coach = [self.p.home_coach()]
            self.cur.execute(
                "SELECT name FROM coaches WHERE name = %s", home_coach)
            result = self.cur.fetchall()
            if result:
                print('Coach already in database')
                return
            else:
                self.cur.execute(
                    "INSERT INTO coaches (name) VALUES (%s)", home_coach)
                self.cnx.commit()
                print('Home coach inserted')
                return

    def insert_away_coach(self):
        if self.p.away_coach() is None:
            return None
        else:
            away_coach = [self.p.away_coach()]
            self.cur.execute(
                "SELECT name FROM coaches WHERE name = %s", away_coach)
            result = self.cur.fetchall()
            if result:
                print('Coach already in database')
                return
            else:
                self.cur.execute(
                    "INSERT INTO coaches (name) VALUES (%s)", away_coach)
                self.cnx.commit()
                print('Away coach inserted')
                return

    def insert_competition(self):
        values = (self.p.competition(), self.p.competition_year())
        self.cur.execute(
            "SELECT * FROM competitions WHERE name = %s AND year = %s", values)
        result = self.cur.fetchall()
        if result:
            print('Competition already in database')
            return
        else:
            self.cur.execute(
                "INSERT INTO competitions (name, year) VALUES (%s, %s)", values)
            self.cnx.commit()
            print('Competition inserted')
            return

    def insert_home_team(self):
        values = (self.p.home_team(), self.p.home_team_state())
        self.cur.execute(
            "SELECT * FROM teams WHERE name = %s AND state = %s", values)
        result = self.cur.fetchall()
        if result:
            print('Home team already in database')
            return
        else:
            self.cur.execute(
                "INSERT INTO teams (name, state) VALUES (%s, %s)", values)
            self.cnx.commit()
            print('Home team inserted')
            return

    def insert_away_team(self):
        values = (self.p.away_team(), self.p.away_team_state())
        self.cur.execute(
            "SELECT * FROM teams WHERE name = %s AND state = %s", values)
        result = self.cur.fetchall()
        if result:
            print('Away team already in database')
            return
        else:
            self.cur.execute(
                "INSERT INTO teams (name, state) VALUES (%s, %s)", values)
            self.cnx.commit()
            print('Away team inserted')
            return

    def competition_id(self):
        values = (self.p.competition(), self.p.competition_year())
        self.cur.execute(
            "SELECT competition_id FROM competitions WHERE name = %s AND year = %s", values)
        result = self.cur.fetchone()
        return result[0]

    def home_team_id(self):
        team_values = (self.p.home_team(), self.p.home_team_state())
        self.cur.execute(
            "SELECT team_id FROM teams WHERE name = %s AND state = %s", team_values)
        result = self.cur.fetchone()
        return result[0]

    def away_team_id(self):
        team_values = (self.p.away_team(), self.p.away_team_state())
        self.cur.execute(
            "SELECT team_id FROM teams WHERE name = %s AND state = %s", team_values)
        result = self.cur.fetchone()
        return result[0]

    def home_coach_id(self):
        if self.p.home_coach() is None:
            return None
        else:
            coach_name = [self.p.home_coach()]
            self.cur.execute(
                "SELECT coach_id FROM coaches WHERE name = %s", coach_name)
            result = self.cur.fetchone()
            return result[0]

    def away_coach_id(self):
        if self.p.away_coach() is None:
            return None
        else:
            coach_name = [self.p.away_coach()]
            self.cur.execute(
                "SELECT coach_id FROM coaches WHERE name = %s", coach_name)
            result = self.cur.fetchone()
            return result[0]

    def insert_match(self):
        self.cur.execute(
            "SELECT * FROM matches WHERE pdf_file_name = %s", [self.file_name])
        result = self.cur.fetchall()
        if result:
            print('Match already in database')
            return
        else:
            print(self.p.away_subs())
            first_home_sub = self.p.first_home_sub()
            first_away_sub = self.p.first_away_sub()
            if first_home_sub is None:
                first_home_sub_minute = None
                first_home_sub_half = None
            else:
                first_home_sub_minute = first_home_sub[0]
                first_home_sub_half = first_home_sub[1]
            if first_away_sub is None:
                first_away_sub_minute = None
                first_away_sub_half = None
            else:
                first_away_sub_minute = first_away_sub[0]
                first_away_sub_half = first_away_sub[1]
            values = (self.competition_id(),
                      self.p.date() + ' ' + self.p.time(),
                      self.p.stadium(),
                      self.home_coach_id(),
                      self.home_team_id(),
                      self.p.home_score(),
                      self.p.away_score(),
                      self.away_team_id(),
                      self.away_coach_id(),
                      self.p.home_yellow_cards(),
                      self.p.home_red_cards(),
                      self.p.away_yellow_cards(),
                      self.p.away_red_cards(),
                      self.p.home_subs(),
                      self.p.away_subs(),
                      first_home_sub_minute,
                      first_home_sub_half,
                      first_away_sub_minute,
                      first_away_sub_half,
                      self.file_name)
            self.cur.execute(
                """INSERT INTO matches (
                    competition_id, 
                    date_time, 
                    stadium, 
                    home_coach_id, 
                    home_team_id, 
                    home_score, 
                    away_score, 
                    away_team_id,
                    away_coach_id, 
                    home_yellow_cards, 
                    home_red_cards, 
                    away_yellow_cards, 
                    away_red_cards,
                    home_subs, 
                    away_subs, 
                    first_home_sub_minute, 
                    first_home_sub_half, 
                    first_away_sub_minute, 
                    first_away_sub_half, 
                    pdf_file_name) 
                    VALUES (%s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s)""",
                values)
            self.cnx.commit()
            print('Match inserted')
            return

    def close_connection(self):
        self.cur.close()
        self.cnx.close()
        return


def insert_into_database(url):
    pdf = PDF(url)
    try:
        pdf.download()
    except:
        print('File does not exist')
        return
    connect = Connection('sumulas/{}/{}'.format(pdf.year, pdf.file_name)))
    connect.insert_home_coach()
    connect.insert_away_coach()
    connect.insert_home_team()
    connect.insert_away_team()
    connect.insert_competition()
    connect.insert_match()
    connect.close_connection()
    return


competition_codes = {'Campeonato Brasileiro - Série A': 142,
                     'Campeonato Brasileiro - Série B': 242,
                     'Campeonato Brasileiro - Série C': 342,
                     'Campeonato Brasileiro - Série D': 542,
                     'Copa do Brasil - Profissional': 424}

match_exceptions = ['201454280']

for x in range(2014, 2024):
    for y in competition_codes.values():
        for z in range(1, 400):
            if '{}{}{}'.format(x, y, z) not in match_exceptions:
                url = 'https://conteudo.cbf.com.br/sumulas/{}/{}{}se.pdf'.format(
                    x, y, z)
                insert_into_database(url)

# url = 'https://conteudo.cbf.com.br/sumulas/2015/4241se.pdf'
# insert_into_database(url)
