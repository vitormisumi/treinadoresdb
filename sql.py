import mysql.connector
import leitor_de_sumula


cnx = mysql.connector.connect(
    host='127.0.0.1',
    port='3306',
    user='root',
    password='8A*EWji7iofvy2Ym',
    database='treineiros'
)


class Connection:
    def __init__(self, pdf_file_name):
        self.cur = cnx.cursor()
        self.p = leitor_de_sumula.Sumula(pdf_file_name)
        self.pdf_file_name = pdf_file_name

    def insert_home_coach(self):
        home_coach = [self.p.home_coach()]
        self.cur.execute(
            "SELECT name FROM coaches WHERE name = %s", home_coach)
        result = self.cur.fetchall()
        if result:
            print('Coach already in database')
            return
        else:
            self.cur.execute("INSERT INTO coaches (name) VALUES (%s)", home_coach)
            cnx.commit()
            print('Home coach inserted')
            return

    def insert_away_coach(self):
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
            cnx.commit()
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
            cnx.commit()
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
            cnx.commit()
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
            cnx.commit()
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
        coach_name = [self.p.home_coach()]
        self.cur.execute(
            "SELECT coach_id FROM coaches WHERE name = %s", coach_name)
        result = self.cur.fetchone()
        return result[0]

    def away_coach_id(self):
        coach_name = [self.p.away_coach()]
        self.cur.execute(
            "SELECT coach_id FROM coaches WHERE name = %s", coach_name)
        result = self.cur.fetchone()
        return result[0]

    def insert_match(self):
        first_home_sub = self.p.first_home_sub()
        first_away_sub = self.p.first_away_sub()
        first_home_sub_minute = first_home_sub[0]
        first_home_sub_half = first_home_sub[1]
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
                  self.pdf_file_name)
        self.cur.execute(
            "SELECT * FROM matches WHERE pdf_file_name = %s", [self.pdf_file_name])
        result = self.cur.fetchall()
        if result:
            print('Match already in database')
            return
        else:
            self.cur.execute(
                "INSERT INTO matches (competition_id, date_time, stadium, home_coach_id, home_team_id, home_score, away_score, away_team_id, away_coach_id, home_yellow_cards, home_red_cards, away_yellow_cards, away_red_cards, home_subs, away_subs, first_home_sub_minute, first_home_sub_half, first_away_sub_minute, first_away_sub_half, pdf_file_name) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", values)
            cnx.commit()
            print('Match inserted')
            return


connect = Connection('342216se.pdf')
connect.insert_match()

cnx.close()
