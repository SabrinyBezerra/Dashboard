#Fazendo consultas sobre os 5 municipios que mais tem acidentes de cada estado
from builtins import print

from flask_restful import Resource, marshal_with, abort
from database.PgConector import *

class Top_Acidente(Resource):

    # GET Acidentes
    #Excecoes do mapa do Brasil, no qual os estados do Acre e de Roraima estao apenas com numeros e nao sua sigla
    def get(self, estado):
        if (estado == "BR.1099"):
            estado = "AC"
        elif (estado == "BR.153"):
            estado = "RO"
        else:
            estado = estado[3] + estado[4]

          #Consulta SQL
        cur.execute(
            'select municipio, count(*) from public."MyData" where uf like \'{}\' group by municipio order by count (*) desc limit 5'.format(estado))

        acidentePesquisa = cur.fetchall()
        # acidentePesquisa = cur.fetchall()[0]

        return acidentePesquisa
