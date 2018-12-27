#Fazendo consultas do numero de acidentes de cada estado 
from flask_restful import Resource, marshal_with, abort
from database.PgConector import *

class UF_Acidente(Resource):

    # GET Acidentes
    def get(self):

        sql = 'select uf, count(uf) from public."MyData" group by uf'
        #Consulta SQL
        cur.execute(sql)
        acidentePesquisa = cur.fetchall()
        #acidentePesquisa = cur.fetchall()[0]


        return acidentePesquisa
