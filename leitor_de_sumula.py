import smtplib
import ssl
from email.message import EmailMessage
from PyPDF2 import PdfReader
import requests
import mysql.connector
from os import path
from datetime import date


class PDF:
    def __init__(self, url):
        self.url = url
        self.file_name = url.split(sep='/')[-1]
        self.year = url.split(sep='/')[-2]

    def download(self):
        if path.exists('sumulas/{}/{}'.format(self.year, self.file_name)):
            print('PDF file {}/{} already downloaded'.format(self.year, self.file_name))
            return
        else:
            response = requests.get(self.url)
            if response.status_code == requests.codes.ok:
                pdf = open('sumulas/{}/{}'.format(self.year,
                                                  self.file_name), 'wb')
                pdf.write(response.content)
                pdf.close()
                print('PDF file {}/{} downloaded'.format(self.year, self.file_name))
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
        self.staff = self.text.replace('Tecnico', 'Técnico').lower()
        self.sub = self.text.replace('1T', '1T ').replace(
            '2T', '2T ').replace('INT', 'INT ').lower()

    def competition(self):
        find_string = '\nCampeonato:'
        competition_string_index = self.text.find(find_string)
        competition_start_index = competition_string_index + \
            len(find_string)
        end_string_index = self.text.find(' Rodada:', competition_start_index)
        if competition_string_index == -1:
            return None
        else:
            return self.text[competition_start_index: end_string_index].split(sep='/')[0].strip().title()

    def competition_year(self):
        find_string = '\nCampeonato:'
        competition_string_index = self.text.find(find_string)
        competition_start_index = competition_string_index + \
            len(find_string)
        end_string_index = self.text.find(' Rodada:', competition_start_index)
        if competition_string_index == -1:
            return None
        else:
            return int(self.text[competition_start_index: end_string_index].split(sep='/')[1].strip())

    def home_team(self):
        find_string = 'Jogo:'
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index)
        home_team = self.text[game_start_index + len(find_string): x_index]
        return home_team.split(sep='/')[0].strip().title()

    def home_team_state(self):
        find_string = 'Jogo:'
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index)
        home_team = self.text[game_start_index + len(find_string): x_index]
        return home_team.split(sep='/')[1].strip().upper()

    def home_team_no_space(self):
        return '{}/{}'.format(self.home_team().lower(), self.home_team_state().lower())

    def home_team_space(self):
        return '{} / {}'.format(self.home_team().lower(), self.home_team_state().lower())

    def away_team(self):
        find_string = 'Jogo:'
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index) + 3
        line_break_index = self.text.find('\n', x_index)
        away_team = self.text[x_index: line_break_index]
        return away_team.split(sep='/')[0].strip().title()

    def away_team_state(self):
        find_string = 'Jogo:'
        game_start_index = -1
        for i in range(0, 2):
            game_start_index = self.text.find(
                find_string, game_start_index + 1)
        x_index = self.text.find(' X ', game_start_index) + 3
        line_break_index = self.text.find('\n', x_index)
        away_team = self.text[x_index: line_break_index]
        return away_team.split(sep='/')[1].strip().upper()

    def away_team_no_space(self):
        return '{}/{}'.format(self.away_team().lower(), self.away_team_state().lower())

    def away_team_space(self):
        return '{} / {}'.format(self.away_team().lower(), self.away_team_state().lower())

    def home_coach(self):
        text = self.staff[self.staff.find('comissão técnica\n'):]
        find_string = '\ntécnico: '
        coach_string_index = text.find(
            find_string, text.find(self.home_team_space()), text.find(self.away_team_space()))
        coach_start_index = coach_string_index + len(find_string)
        if coach_string_index == -1:
            return None
        else:
            line_break_index = text.find('\n', coach_start_index)
            dash_index = text.find('-', coach_start_index)
            if dash_index == -1 or dash_index >= line_break_index:
                return text[coach_start_index: line_break_index].strip().title()
            elif dash_index < line_break_index:
                return text[coach_start_index: dash_index].strip().title()

    def away_coach(self):
        text = self.staff[self.staff.find('comissão técnica\n'):]
        find_string = '\ntécnico: '
        coach_string_index = text.find(
            find_string, text.find(self.away_team_space()), text.find('\ngols\n'))
        coach_start_index = coach_string_index + len(find_string)
        if coach_string_index == -1:
            return None
        else:
            line_break_index = text.find('\n', coach_start_index)
            dash_index = text.find('-', coach_start_index)
            if dash_index == -1 or dash_index >= line_break_index:
                return text[coach_start_index: line_break_index].strip().title()
            elif dash_index < line_break_index:
                return text[coach_start_index: dash_index].strip().title()

    def date(self):
        find_string = '\nData:'
        date_string_index = self.text.find(find_string)
        date_start_index = date_string_index + len(find_string)
        if date_string_index == -1:
            return None
        else:
            if self.text[date_start_index: date_start_index + 1] == ' ':
                date = self.text[date_start_index + 1: date_start_index + 11]
            else:
                date = self.text[date_start_index: date_start_index + 10]
        date = date.split(sep='/')
        return '{}-{}-{}'.format(date[2], date[1], date[0])

    def time(self):
        find_string = 'Horário:'
        time_string_index = self.text.find(find_string)
        time_start_index = time_string_index + len(find_string)
        if time_string_index == -1:
            return None
        else:
            if self.text[time_start_index: time_start_index + 1] == ' ':
                return self.text[time_start_index + 1: time_start_index + 6] + ':00'
            else:
                return self.text[time_start_index: time_start_index + 5] + ':00'

    def stadium(self):
        find_string = 'Estádio:'
        stadium_string_index = self.text.find(find_string)
        stadium_start_index = stadium_string_index + len(find_string)
        line_break_index = self.text.find('\n', stadium_start_index)
        if stadium_string_index == -1:
            return None
        else:
            return self.text[stadium_start_index: line_break_index].title().strip()

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
            find_string = 'resultado do 2º Tempo: '
            goal_string_index = self.text.find(find_string)
            goal_start_index = goal_string_index + len(find_string)
        line_break_index = self.text.find('\n', goal_start_index)
        return int(self.text[goal_start_index: line_break_index].split(sep=' ')[2])

    def home_yellow_cards(self):
        return self.text.count('{}/{}'.format(self.home_team(), self.home_team_state()),
                               self.text.find('\nCartões Amarelos\n'),
                               self.text.find('\nCartões Vermelhos\n'))

    def away_yellow_cards(self):
        return self.text.count('{}/{}'.format(self.away_team(), self.away_team_state()),
                               self.text.find('\nCartões Amarelos\n'),
                               self.text.find('\nCartões Vermelhos\n'))

    def home_red_cards(self):
        count = 0
        text = self.text[self.text.find('\nCartões Vermelhos\n'):
                         self.text.find('Ocorrências / Observações')].split(sep='\n')
        home_team = self.home_team()
        home_team_state = '/' + self.home_team_state()
        for line in text:
            if home_team and home_team_state in line:
                count += 1
        return count

    def away_red_cards(self):
        count = 0
        text = self.text[self.text.find('\nCartões Vermelhos\n'):
                         self.text.find('Ocorrências / Observações')].split(sep='\n')
        home_team = self.away_team()
        home_team_state = '/' + self.away_team_state()
        for line in text:
            if home_team and home_team_state in line:
                count += 1
        return count

    def home_subs(self):
        return self.sub.count(self.home_team_no_space(), self.sub.find('\nsubstituições\n'))

    def away_subs(self):
        return self.sub.count(self.away_team_no_space(), self.sub.find('\nsubstituições\n'))

    def first_home_sub(self):
        if self.home_subs() == 0:
            return None
        sub_minutes = []
        text = self.sub[self.sub.find('\nsubstituições\n'):]
        lines = text.split(sep='\n')
        home_subs = [
            line for line in lines if self.home_team_no_space() in line]
        first_half_subs = [sub for sub in home_subs if '1t ' in sub]
        if first_half_subs:
            for sub in first_half_subs:
                sub = sub.split(sep='1t ')
                sub = sub[0].split(sep=':')
                sub_time = sub[0]
                if sub_time[0] == '+':
                    sub_time = int(sub_time[1:]) + 45
                    sub_minutes.append(sub_time)
                else:
                    sub_minutes.append(int(sub_time[: 2]))
            return [min(sub_minutes), '1T']
        half_time_subs = [sub for sub in home_subs if 'int ' in sub]
        if half_time_subs:
            return [45, 'INT']
        second_half_subs = [sub for sub in home_subs if '2t ' in sub]
        for sub in second_half_subs:
            sub = sub.split(sep='2t ')
            sub = sub[0].split(sep=':')
            sub_time = sub[0]
            if sub_time[0] == '+':
                sub_time = int(sub_time[1:]) + 45
                sub_minutes.append(sub_time)
            else:
                sub_minutes.append(int(sub_time[: 2]))
        return [min(sub_minutes), '2T']

    def first_away_sub(self):
        if self.away_subs() == 0:
            return None
        sub_minutes = []
        text = self.sub[self.sub.find('\nsubstituições\n'):]
        lines = text.split(sep='\n')
        away_subs = [
            line for line in lines if self.away_team_no_space() in line]
        first_half_subs = [sub for sub in away_subs if '1t ' in sub]
        if first_half_subs:
            for sub in first_half_subs:
                sub = sub.split(sep='1t ')
                sub = sub[0].split(sep=':')
                sub_time = sub[0]
                if sub_time[0] == '+':
                    sub_time = int(sub_time[1:]) + 45
                    sub_minutes.append(sub_time)
                else:
                    sub_minutes.append(int(sub_time[: 2]))
            return [min(sub_minutes), '1T']
        half_time_subs = [sub for sub in away_subs if 'int ' in sub]
        if half_time_subs:
            return [45, 'INT']
        second_half_subs = [sub for sub in away_subs if '2t ' in sub]
        for sub in second_half_subs:
            sub = sub.split(sep='2t ')
            sub = sub[0].split(sep=':')
            sub_time = sub[0]
            if sub_time[0] == '+':
                sub_time = int(sub_time[1:]) + 45
                sub_minutes.append(sub_time)
            else:
                sub_minutes.append(int(sub_time[: 2]))
        return [min(sub_minutes), '2T']

    def home_goal_minutes(self):
        if self.home_score == 0:
            return {'1T': [], '2T': []}
        else:
            goals_string = self.text[self.text.find(
                '\nGols\n'): self.text.find('\nCartões Amarelos\n')]
            goals_lines = goals_string.split(sep='\n')
            goal_minutes = {'1T': [], '2T': []}
            for line in goals_lines:
                if line.lower().endswith(self.home_team_no_space()) and 'CT' not in line:
                    minute = int(line[0: 2])
                    if line[0] == '+':
                        extra_time = line.split(sep=' ')
                        minute = int(extra_time[0][1:]) + 45
                    if '1T' in line:
                        goal_minutes['1T'].append(minute)
                    elif '2T' in line:
                        goal_minutes['2T'].append(minute)
                elif line.lower().endswith(self.away_team_no_space()) and 'CT' in line:
                    minute = int(line[0: 2])
                    if line[0] == '+':
                        extra_time = line.split(sep=' ')
                        minute = int(extra_time[0][1:]) + 45
                    if '1T' in line:
                        goal_minutes['1T'].append(minute)
                    elif '2T' in line:
                        goal_minutes['2T'].append(minute)
            return goal_minutes

    def away_goal_minutes(self):
        if self.away_score == 0:
            return {'1T': [], '2T': []}
        else:
            goals_string = self.text[self.text.find(
                '\nGols\n'): self.text.find('\nCartões Amarelos\n')]
            goals_lines = goals_string.split(sep='\n')
            goal_minutes = {'1T': [], '2T': []}
            for line in goals_lines:
                if line.lower().endswith(self.away_team_no_space()) and 'CT' not in line:
                    minute = int(line[0: 2])
                    if line[0] == '+':
                        extra_time = line.split(sep=' ')
                        minute = int(extra_time[0][1:]) + 45
                    if '1T' in line:
                        goal_minutes['1T'].append(minute)
                    elif '2T' in line:
                        goal_minutes['2T'].append(minute)
                elif line.lower().endswith(self.home_team_no_space()) and 'CT' in line:
                    minute = int(line[0: 2])
                    if line[0] == '+':
                        extra_time = line.split(sep=' ')
                        minute = int(extra_time[0][1:]) + 45
                    if '1T' in line:
                        goal_minutes['1T'].append(minute)
                    elif '2T' in line:
                        goal_minutes['2T'].append(minute)
            return goal_minutes

    def home_score_before_home_sub(self):
        if self.home_subs() == 0:
            return self.home_score()
        elif self.first_home_sub()[1] == '1T':
            return sum([minute < self.first_home_sub()[0] for minute in self.home_goal_minutes()['1T']])
        elif self.first_home_sub()[1] == 'INT':
            return len(self.home_goal_minutes()['1T'])
        else:
            return len(self.home_goal_minutes()['1T']) + sum([minute < self.first_home_sub()[0] for minute in self.home_goal_minutes()['2T']])

    def away_score_before_home_sub(self):
        if self.home_subs() == 0:
            return self.away_score()
        elif self.first_home_sub()[1] == '1T':
            return sum([minute < self.first_home_sub()[0] for minute in self.away_goal_minutes()['1T']])
        elif self.first_home_sub()[1] == 'INT':
            return len(self.away_goal_minutes()['1T'])
        else:
            return len(self.away_goal_minutes()['1T']) + sum([minute < self.first_home_sub()[0] for minute in self.away_goal_minutes()['2T']])

    def home_score_before_away_sub(self):
        if self.away_subs() == 0:
            return self.home_score()
        elif self.first_away_sub()[1] == '1T':
            return sum([minute < self.first_away_sub()[0] for minute in self.home_goal_minutes()['1T']])
        elif self.first_away_sub()[1] == 'INT':
            return len(self.home_goal_minutes()['1T'])
        else:
            return len(self.home_goal_minutes()['1T']) + sum([minute < self.first_away_sub()[0] for minute in self.home_goal_minutes()['2T']])

    def away_score_before_away_sub(self):
        if self.away_subs() == 0:
            return self.away_score()
        elif self.first_away_sub()[1] == '1T':
            return sum([minute < self.first_away_sub()[0] for minute in self.away_goal_minutes()['1T']])
        elif self.first_away_sub()[1] == 'INT':
            return len(self.away_goal_minutes()['1T'])
        else:
            return len(self.away_goal_minutes()['1T']) + sum([minute < self.first_away_sub()[0] for minute in self.away_goal_minutes()['2T']])

    def home_score_after_home_sub(self):
        return self.home_score() - self.home_score_before_home_sub()

    def away_score_after_home_sub(self):
        return self.away_score() - self.away_score_before_home_sub()

    def home_score_after_away_sub(self):
        return self.home_score() - self.home_score_before_away_sub()

    def away_score_after_away_sub(self):
        return self.away_score() - self.away_score_before_away_sub()


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
                return 0
            else:
                self.cur.execute(
                    "INSERT INTO coaches (name) VALUES (%s)", home_coach)
                self.cnx.commit()
                return 1

    def insert_away_coach(self):
        if self.p.away_coach() is None:
            return None
        else:
            away_coach = [self.p.away_coach()]
            self.cur.execute(
                "SELECT name FROM coaches WHERE name = %s", away_coach)
            result = self.cur.fetchall()
            if result:
                return 0
            else:
                self.cur.execute(
                    "INSERT INTO coaches (name) VALUES (%s)", away_coach)
                self.cnx.commit()
                return 1

    def insert_competition(self):
        values = (self.p.competition(), self.p.competition_year())
        self.cur.execute(
            "SELECT * FROM competitions WHERE name = %s AND year = %s", values)
        result = self.cur.fetchall()
        if result:
            return 0
        else:
            self.cur.execute(
                "INSERT INTO competitions (name, year) VALUES (%s, %s)", values)
            self.cnx.commit()
            return 1

    def insert_home_team(self):
        values = (self.p.home_team(), self.p.home_team_state())
        self.cur.execute(
            "SELECT * FROM teams WHERE name = %s AND state = %s", values)
        result = self.cur.fetchall()
        if result:
            return 0
        else:
            self.cur.execute(
                "INSERT INTO teams (name, state) VALUES (%s, %s)", values)
            self.cnx.commit()
            return 1

    def insert_away_team(self):
        values = (self.p.away_team(), self.p.away_team_state())
        self.cur.execute(
            "SELECT * FROM teams WHERE name = %s AND state = %s", values)
        result = self.cur.fetchall()
        if result:
            return 0
        else:
            self.cur.execute(
                "INSERT INTO teams (name, state) VALUES (%s, %s)", values)
            self.cnx.commit()
            return 1

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
            return 0
        else:
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
                      self.p.home_score_before_home_sub(),
                      self.p.away_score_before_home_sub(),
                      self.p.home_score_before_away_sub(),
                      self.p.away_score_before_away_sub(),
                      self.p.home_score_after_home_sub(),
                      self.p.away_score_after_home_sub(),
                      self.p.home_score_after_away_sub(),
                      self.p.away_score_after_away_sub(),
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
                    home_score_before_home_sub,
                    away_score_before_home_sub,
                    home_score_before_away_sub,
                    away_score_before_away_sub,
                    home_score_after_home_sub,
                    away_score_after_home_sub,
                    home_score_after_away_sub,
                    away_score_after_away_sub,
                    pdf_file_name)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                values)
            self.cnx.commit()
            return 1

    def close_connection(self):
        self.cur.close()
        self.cnx.close()
        return


coach_errors, team_errors, competitions_errors, match_errors = [], [], [], []
coaches_inserted, teams_inserted, competitions_inserted, matches_inserted = 0, 0, 0, 0


def insert_into_database(url):
    pdf = PDF(url)
    try:
        pdf.download()
    except:
        print('PDF file {}/{} does not exist'.format(pdf.year, pdf.file_name))
        return
    connect = Connection('sumulas/{}/{}'.format(pdf.year, pdf.file_name))
    global coaches_inserted
    try:
        coaches_inserted += connect.insert_home_coach()
    except:
        coach_errors.append('{}/{}'.format(pdf.year, pdf.file_name))
    try:
        coaches_inserted += connect.insert_away_coach()
    except:
        coach_errors.append('{}/{}'.format(pdf.year, pdf.file_name))
    global teams_inserted
    try:
        teams_inserted += connect.insert_home_team()
    except:
        team_errors.append('{}/{}'.format(pdf.year, pdf.file_name))
    try:
        teams_inserted += connect.insert_away_team()
    except:
        team_errors.append('{}/{}'.format(pdf.year, pdf.file_name))
    global competitions_inserted
    try:
        competitions_inserted += connect.insert_competition()
    except:
        competitions_errors.append('{}/{}'.format(pdf.year, pdf.file_name))
    global matches_inserted
    try:
        matches_inserted += connect.insert_match()
    except:
        match_errors.append('{}/{}'.format(pdf.year, pdf.file_name))
    return


competition_codes = {'Campeonato Brasileiro - Série A': 142,
                     'Campeonato Brasileiro - Série B': 242,
                     'Campeonato Brasileiro - Série C': 342,
                     'Campeonato Brasileiro - Série D': 542,
                     'Copa do Brasil - Profissional': 424}

for year in range(2014, 2024):
    for code in competition_codes.values():
        for n in range(1, 400):
            url = 'https://conteudo.cbf.com.br/sumulas/{}/{}{}se.pdf'.format(
                year, code, n)
            insert_into_database(url)

# url = 'https://conteudo.cbf.com.br/sumulas/2014/4241se.pdf'
# pdf = PDF(url)
# connect = Connection('sumulas/{}/{}'.format(pdf.year, pdf.file_name))
# print(connect.p.away_red_cards())

if coach_errors or team_errors or competitions_errors or match_errors:
    subject = 'Database import summary {} - Errors'.format(date.today())
    body = """\
    Here is a summary of the latest database insertions:
    A total of {} coaches, {} teams, {} competitions and {} matches were added to the database.

    The following games had problems:
    Coach insertion problems: {}
    Team insertion problems: {}
    Competition insertion problems: {}
    Match insertion problems: {}
    """.format(coaches_inserted, teams_inserted, competitions_inserted, matches_inserted,
               coach_errors, team_errors, competitions_errors, match_errors)
else:
    subject = 'Database import summary {} - No errors'.format(date.today())
    body = """\
    Here is a summary of the latest database insertions:
    A total of {} coaches, {} teams, {} competitions and {} matches were added to the database.

    There were no problems this time!
    """.format(coaches_inserted, teams_inserted, competitions_inserted, matches_inserted)

user = 'treineiros.db@gmail.com'
password = 'hwtkijmkcaepaojl'
receiver = 'vitormisumi@gmail.com'

em = EmailMessage()
em['From'] = user
em['To'] = receiver
em['Subject'] = subject
em.set_content(body)

context = ssl.create_default_context()

with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
    smtp.login(user, password)
    smtp.sendmail(user, receiver, em.as_string())
