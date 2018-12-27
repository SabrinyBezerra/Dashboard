#Conexao com o Banco de Dados PostgreSQL

import psycopg2
from model.Acidente import Acidente

con = psycopg2.connect(host='localhost', database='Test', user='postgres', password='sabriny123')
cur = con.cursor()
